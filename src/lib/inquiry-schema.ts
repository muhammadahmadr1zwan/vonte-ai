import { z } from "zod"

import { industries, contactMethods } from "@/lib/content"
import { packageIds } from "@/lib/pricing"

function asEnum<T extends string>(values: readonly T[]) {
  if (values.length === 0) {
    throw new Error("Expected at least one option.")
  }
  return values as unknown as [T, ...T[]]
}

const industryIds = asEnum(industries.map((item) => item.id))
const methodIds = asEnum(contactMethods.map((item) => item.id))
const selectablePackages = asEnum([...packageIds, "unsure"])

const websitePattern =
  /^(https?:\/\/[^\s]+|[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?)+(?:[/?#][^\s]*)?)$/i

export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  businessName: z
    .string()
    .trim()
    .min(2, "Enter your business name.")
    .max(160, "Business name is too long."),
  email: z.email("Enter a valid business email."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "")
      return digits.length >= 10 && digits.length <= 15
    }, "Enter a phone number with 10 to 15 digits."),
  industry: z.enum(industryIds, "Select an industry."),
  website: z
    .string()
    .trim()
    .max(200, "Website is too long.")
    .refine(
      (value) => value === "" || websitePattern.test(value),
      "Enter a website address, or leave this blank.",
    ),
  packageId: z.enum(selectablePackages, "Select a package."),
  challenge: z
    .string()
    .trim()
    .min(10, "Tell us a little about the challenge. A sentence is enough.")
    .max(2000, "Please keep this under 2,000 characters."),
  contactMethod: z.enum(methodIds, "Choose how we should follow up."),
  consent: z.literal(
    "yes",
    "Consent is required so we can contact you about this request.",
  ),
})

export type InquiryInput = z.infer<typeof inquirySchema>

export type InquiryField = keyof InquiryInput

export function readInquiryForm(formData: FormData) {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    businessName: String(formData.get("businessName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    website: String(formData.get("website") ?? ""),
    packageId: String(formData.get("packageId") ?? ""),
    challenge: String(formData.get("challenge") ?? ""),
    contactMethod: String(formData.get("contactMethod") ?? ""),
    consent: formData.get("consent") === "yes" ? "yes" : "",
  }
}

export function parseInquiry(formData: FormData) {
  const parsed = inquirySchema.safeParse(readInquiryForm(formData))
  if (parsed.success) {
    return { success: true as const, data: parsed.data }
  }

  const fieldErrors: Partial<Record<InquiryField, string>> = {}
  for (const issue of parsed.error.issues) {
    const key = issue.path[0]
    if (typeof key === "string" && !(key in fieldErrors)) {
      fieldErrors[key as InquiryField] = issue.message
    }
  }

  return {
    success: false as const,
    fieldErrors,
    message: "Check the highlighted fields and send the request again.",
  }
}
