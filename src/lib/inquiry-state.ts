import type { InquiryField } from "@/lib/inquiry-schema"

export type InquiryState = {
  status: "idle" | "error" | "success" | "saved-notify-failed"
  message: string
  fieldErrors: Partial<Record<InquiryField, string>>
  reference?: string
}

export const initialInquiryState: InquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
}
