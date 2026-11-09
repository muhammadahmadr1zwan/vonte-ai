"use server"

import { headers } from "next/headers"
import type { InquiryState } from "@/lib/inquiry-state"
import { processInquiry } from "@/lib/inquiry-service"

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const headerList = await headers()
  // The deployment proxy must strip client-supplied forwarding headers.
  const key = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "local"
  return processInquiry(formData, key)
}
