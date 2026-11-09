"use server"

import { headers } from "next/headers"

import type { InquiryState } from "@/lib/inquiry-state"
import { parseInquiry } from "@/lib/inquiry-schema"
import {
  createInquiryRecord,
  notifyInquiry,
  notificationsConfigured,
  rateLimit,
  saveInquiry,
} from "@/lib/inquiries"

async function clientKey() {
  const headerList = await headers()
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || headerList.get("x-real-ip") || "local"
}

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const honeypot = String(formData.get("company_fax") ?? "").trim()
  if (honeypot) {
    return {
      status: "error",
      message: "We couldn't submit that request. Please use the fields shown on the form.",
      fieldErrors: {},
    }
  }

  const started = Number(formData.get("formStarted"))
  if (Number.isFinite(started) && started > 0) {
    const elapsed = Date.now() - started
    if (elapsed >= 0 && elapsed < 1200) {
      return {
        status: "error",
        message: "Please take a moment to review the form, then send it again.",
        fieldErrors: {},
      }
    }
  }

  const parsed = parseInquiry(formData)
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.message,
      fieldErrors: parsed.fieldErrors,
    }
  }

  const key = await clientKey()
  if (!rateLimit(key)) {
    return {
      status: "error",
      message: "Too many requests from this connection. Please wait and try again.",
      fieldErrors: {},
    }
  }

  const record = createInquiryRecord(parsed.data)

  try {
    await saveInquiry(record)
  } catch (error) {
    console.error(
      `Inquiry save failed: ${error instanceof Error ? error.message : "unknown error"}`,
    )
    return {
      status: "error",
      message:
        "We could not save your request, so it was not confirmed. Please try again.",
      fieldErrors: {},
    }
  }

  if (!notificationsConfigured()) {
    return {
      status: "success",
      message:
        "Request received. We'll review it and follow up using the contact method you selected. This form does not reserve a meeting time.",
      fieldErrors: {},
      reference: record.reference,
    }
  }

  const notification = await notifyInquiry(record)
  if (!notification.ok) {
    return {
      status: "saved-notify-failed",
      message:
        "Your request is saved. The notification channel did not send, so keep this reference and do not submit again. We'll still have the record.",
      fieldErrors: {},
      reference: record.reference,
    }
  }

  return {
    status: "success",
    message:
      "Request received. We'll review it and follow up using the contact method you selected. This form does not reserve a meeting time.",
    fieldErrors: {},
    reference: record.reference,
  }
}
