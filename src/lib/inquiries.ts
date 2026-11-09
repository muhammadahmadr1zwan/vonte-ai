import { randomUUID } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import type { InquiryInput } from "@/lib/inquiry-schema"
import { getPackage } from "@/lib/pricing"

export type StoredInquiry = InquiryInput & {
  id: string
  reference: string
  packageName: string
  createdAt: string
}

const hits = new Map<string, number[]>()

export function inquiryDirectory() {
  return (
    process.env.INQUIRY_DATA_DIR?.trim() ||
    path.join(process.cwd(), "data", "inquiries")
  )
}

export function resetRateLimit() {
  hits.clear()
}

export function rateLimit(key: string, limit = 30, windowMs = 60 * 60 * 1000) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

export function createInquiryRecord(input: InquiryInput): StoredInquiry {
  const id = randomUUID()
  const selected = getPackage(input.packageId)
  return {
    ...input,
    id,
    reference: `VN-${id.slice(0, 8).toUpperCase()}`,
    packageName: selected?.name ?? "Not sure yet",
    createdAt: new Date().toISOString(),
  }
}

export async function saveInquiry(record: StoredInquiry) {
  const dir = inquiryDirectory()
  await mkdir(dir, { recursive: true })
  const file = path.join(dir, `${record.id}.json`)
  await writeFile(file, `${JSON.stringify(record, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  })
  return file
}

type NotifyResult = { ok: true } | { ok: false; detail: string }

function resendConfig() {
  const key = process.env.RESEND_API_KEY?.trim() ?? ""
  const to = process.env.INQUIRY_NOTIFY_EMAIL?.trim() ?? ""
  const from = process.env.INQUIRY_FROM_EMAIL?.trim() ?? ""
  return {
    any: Boolean(key || to || from),
    ready: Boolean(key && to && from),
    key,
    to,
    from,
  }
}

export function notificationsConfigured() {
  return Boolean(process.env.INQUIRY_WEBHOOK_URL?.trim() || resendConfig().any)
}

function inquiryText(record: StoredInquiry) {
  return [
    `New VONTE consultation request ${record.reference}`,
    `Received: ${record.createdAt}`,
    `Name: ${record.fullName}`,
    `Business: ${record.businessName}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone}`,
    `Industry: ${record.industry}`,
    `Website: ${record.website || "(not provided)"}`,
    `Package: ${record.packageName}`,
    `Preferred contact: ${record.contactMethod}`,
    "",
    record.challenge,
  ].join("\n")
}

async function postWebhook(record: StoredInquiry): Promise<NotifyResult> {
  const url = process.env.INQUIRY_WEBHOOK_URL?.trim()
  if (!url) return { ok: true }
  try {
    const headers: Record<string, string> = {
      "content-type": "application/json",
    }
    const secret = process.env.INQUIRY_WEBHOOK_SECRET?.trim()
    if (secret) headers.authorization = `Bearer ${secret}`
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) {
      return { ok: false, detail: `Webhook responded ${response.status}.` }
    }
    return { ok: true }
  } catch {
    return { ok: false, detail: "Webhook request failed." }
  }
}

async function sendResend(record: StoredInquiry): Promise<NotifyResult> {
  const config = resendConfig()
  if (!config.any) return { ok: true }
  if (!config.ready) {
    return {
      ok: false,
      detail:
        "Email notification is only partly configured. Set RESEND_API_KEY, INQUIRY_FROM_EMAIL, and INQUIRY_NOTIFY_EMAIL together.",
    }
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: `VONTE inquiry ${record.reference}: ${record.businessName}`,
        text: inquiryText(record),
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) {
      return { ok: false, detail: `Email notification responded ${response.status}.` }
    }
    return { ok: true }
  } catch {
    return { ok: false, detail: "Email notification failed." }
  }
}

export async function notifyInquiry(record: StoredInquiry) {
  const [webhook, email] = await Promise.all([
    postWebhook(record),
    sendResend(record),
  ])
  const details = [webhook, email].flatMap((result) =>
    result.ok ? [] : [result.detail],
  )
  if (details.length) {
    console.error(`Inquiry ${record.reference} notification issue: ${details.join(" ")}`)
  }
  return { ok: details.length === 0, details }
}
