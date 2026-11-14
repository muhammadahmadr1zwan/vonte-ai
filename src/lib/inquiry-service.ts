import type { InquiryState } from "@/lib/inquiry-state"
import { parseInquiry } from "@/lib/inquiry-schema"
import { createInquiryRecord, notifyInquiry, notificationsConfigured, rateLimit, saveInquiry } from "@/lib/inquiries"

export async function processInquiry(
  formData: FormData,
  key: string,
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

  if (!rateLimit(key)) {
    return {
      status: "error",
      message: "Too many requests from this connection. Please wait and try again.",
      fieldErrors: {},
    }
  }

  const rawId = String(formData.get("submissionId") ?? "")
  const submissionId = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(rawId) ? rawId : undefined
  if (!submissionId) return { status: "error", message: "Refresh this page before sending your request again.", fieldErrors: {} }
  let record = createInquiryRecord(parsed.data, submissionId)

  try {
    const saved = await saveInquiry(record)
    record = saved.record
    if (!saved.created) {
      if (saved.conflict) return { status: "saved-notify-failed", message: "An earlier version of this request is already saved. Keep this reference and mention your updated details when we follow up. No second request was created.", fieldErrors: {}, reference: record.reference }
      return { status: "success", message: "This request is already saved. Keep your reference; there is no need to submit it again. This does not reserve a meeting.", fieldErrors: {}, reference: record.reference }
    }
  } catch (error) {
    console.error("Inquiry save failed.", error instanceof Error ? error.name : "Unknown error")
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
