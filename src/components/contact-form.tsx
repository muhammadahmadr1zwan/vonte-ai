"use client"

import { useActionState, useEffect, useRef, useState } from "react"

import { submitInquiry } from "@/app/contact/actions"
import { initialInquiryState } from "@/lib/inquiry-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactMethods, expectations, industries } from "@/lib/content"
import type { InquiryField } from "@/lib/inquiry-schema"
import { parseInquiry } from "@/lib/inquiry-schema"
import { formatMoney } from "@/lib/format"
import { getPackage, packages } from "@/lib/pricing"
import { siteConfig } from "@/lib/site"
import { cn } from "cn"

const fieldClass =
  "h-12 rounded-[2px] border-navy/15 bg-paper px-3 text-base text-ink md:text-base"

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-[#9f2d2d]">
      {message}
    </p>
  )
}

export function ContactInquiry({ initialPackage, submissionId }: { initialPackage?: string; submissionId: string }) {
  const [selected, setSelected] = useState(getPackage(initialPackage)?.id ?? "unsure")
  return <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
    <div>
      <PackageSummary packageId={selected} className="mb-5 lg:hidden" />
      <ContactForm initialPackage={initialPackage} onPackageChange={setSelected} submissionId={submissionId} />
    </div>
    <ContactAside initialPackage={selected} />
  </div>
}

export function ContactForm({ initialPackage, onPackageChange, submissionId }: { initialPackage?: string; onPackageChange?: (value: string) => void; submissionId: string }) {
  const selected = getPackage(initialPackage)?.id ?? "unsure"
  const [edited, setEdited] = useState(false)
  const submittingRef = useRef(false)
  const [values, setValues] = useState({ fullName: "", businessName: "", email: "", phone: "", industry: "", website: "", packageId: selected as string, challenge: "", contactMethod: "email", consent: false })
  const [state, formAction, pending] = useActionState(async (previous: typeof initialInquiryState, data: FormData) => {
    try {
      const result = await submitInquiry(previous, data)
      setEdited(false)
      return result
    } catch {
      setEdited(false)
      return { ...initialInquiryState, status: "error" as const, message: "We couldn't confirm delivery. Your entries are still here. Check your connection and retry; the same request will not be saved twice." }
    } finally { submittingRef.current = false }
  }, initialInquiryState)
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<InquiryField, string>>
  >({})
  const startedRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) {
      startedRef.current.value = String(Date.now())
    }
  }, [])

  useEffect(() => {
    if (state.status === "success" || state.status === "saved-notify-failed") {
      successRef.current?.focus()
    }
  }, [state.status])

  const errors = { ...(!edited ? state.fieldErrors : {}), ...clientErrors }
  const chosen = getPackage(values.packageId)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target
    const value = field instanceof HTMLInputElement && field.type === "checkbox" ? field.checked : field.value
    setEdited(true)
    setClientErrors((current) => ({ ...current, [field.name]: undefined }))
    setValues((current) => ({ ...current, [field.name]: value }))
    if (field.name === "packageId") onPackageChange?.(field.value)
  }

  if (state.status === "success" || state.status === "saved-notify-failed") {
    return (
      <div className="border border-navy/10 bg-paper p-6 sm:p-8">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-gold-ink uppercase">
          {state.status === "success" ? "Request received" : "Request saved"}
        </p>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-3 font-heading text-3xl font-semibold tracking-[-0.03em] text-navy outline-none"
        >
          {state.status === "success"
            ? "We'll follow up from here."
            : "Keep this reference."}
        </h2>
        <p className="mt-4 text-base leading-7 text-quiet">{state.message}</p>
        {state.reference ? (
          <p className="mt-6 bg-ivory px-4 py-3 font-heading text-lg text-navy">
            Reference {state.reference}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <form
      action={formAction}
      noValidate
      onReset={(event) => event.preventDefault()}
      aria-busy={pending}

      className="relative border border-navy/10 bg-paper p-6 sm:p-8"
      onSubmit={(event) => {
        if (pending || submittingRef.current) { event.preventDefault(); return }
        const parsed = parseInquiry(new FormData(event.currentTarget))
        if (!parsed.success) {
          event.preventDefault()
          setClientErrors(parsed.fieldErrors)
          const first = Object.keys(parsed.fieldErrors)[0]
          if (first) {
            document.getElementById(first)?.focus()
          }
        } else {
          setClientErrors({})
          submittingRef.current = true
        }
      }}
    >
      <fieldset disabled={pending} className="min-w-0 border-0 p-0 disabled:opacity-70">
      <legend className="sr-only">Consultation request details</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={values.fullName} onChange={handleChange}
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="fullName-error" message={errors.fullName} />
        </div>
        <div>
          <Label htmlFor="businessName">Business name</Label>
          <Input
            id="businessName"
            name="businessName"
            value={values.businessName} onChange={handleChange}
            autoComplete="organization"
            required
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? "businessName-error" : undefined}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="businessName-error" message={errors.businessName} />
        </div>
        <div>
          <Label htmlFor="email">Business email</Label>
          <Input
            id="email"
            name="email"
            value={values.email} onChange={handleChange}
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            name="phone"
            value={values.phone} onChange={handleChange}
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            name="industry"
            value={values.industry} onChange={handleChange}
            required
            aria-invalid={Boolean(errors.industry)}
            aria-describedby={errors.industry ? "industry-error" : undefined}
            className={cn(fieldClass, "mt-2 w-full bg-white")}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {industries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <FieldError id="industry-error" message={errors.industry} />
        </div>
        <div>
          <Label htmlFor="website">Business website (optional)</Label>
          <Input
            id="website"
            name="website"
            value={values.website} onChange={handleChange}
            type="text"
            autoComplete="url"
            placeholder="example.com"
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "website-error" : undefined}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="website-error" message={errors.website} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="packageId">Interested package</Label>
          <select
            id="packageId"
            name="packageId"
            value={values.packageId} onChange={handleChange}
            aria-invalid={Boolean(errors.packageId)}
            aria-describedby={errors.packageId ? "packageId-error" : undefined}
            className={cn(fieldClass, "mt-2 w-full bg-white")}
          >
            <option value="unsure">Not sure yet</option>
            {packages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {formatMoney(item.setup)} setup, {formatMoney(item.monthly)}/month
              </option>
            ))}
          </select>
          <FieldError id="packageId-error" message={errors.packageId} />
          {chosen ? (
            <p className="mt-2 text-sm text-quiet">
              {formatMoney(chosen.setup)} setup + {formatMoney(chosen.monthly)}/month. Your consultation will cover this package.
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="challenge">Main challenge or goal</Label>
          <Textarea
            id="challenge"
            name="challenge"
            value={values.challenge} onChange={handleChange}
            required
            rows={5}
            aria-invalid={Boolean(errors.challenge)}
            aria-describedby={errors.challenge ? "challenge-error" : undefined}
            className="mt-2 min-h-32 rounded-[2px] border-navy/15 bg-paper px-3 py-3 text-base text-ink"
          />
          <FieldError id="challenge-error" message={errors.challenge} />
        </div>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink">Preferred contact method</legend>
          <div className="mt-3 flex flex-wrap gap-4">
            {contactMethods.map((method) => (
              <label key={method.id} className="inline-flex min-h-11 items-center gap-2 text-sm text-ink">
                <input
                  type="radio"
                  name="contactMethod"
                  value={method.id}
                  checked={values.contactMethod === method.id} onChange={handleChange}
                  className="size-4 accent-[#091629]"
                />
                {method.label}
              </label>
            ))}
          </div>
          <FieldError id="contactMethod-error" message={errors.contactMethod} />
        </fieldset>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-6 text-ink">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={values.consent} onChange={handleChange}
              value="yes"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : "consent-note"}
              className="mt-1 size-4 accent-[#091629]"
            />
            <span id="consent-note">
              I agree to be contacted about this inquiry. Submitting this form
              does not create a service agreement or reserve a meeting.
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent} />
        </div>
      </div>
      </fieldset>
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_fax">Fax</label>
        <input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="submissionId" defaultValue={submissionId} />
      <input ref={startedRef} type="hidden" name="formStarted" defaultValue="" />

      {(Object.values(clientErrors).some(Boolean) || (!edited && state.status === "error" && state.message)) ? (
        <p role="alert" className="mt-5 text-sm text-[#9f2d2d]">
          {Object.values(clientErrors).some(Boolean) ? "Check the highlighted fields and send the request again." : state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="gold"
        size="cta"
        disabled={pending}
        className="mt-6 w-full sm:w-auto"
      >
        {pending ? "Sending request…" : "Request a consultation"}
      </Button>
      <p className="mt-4 text-xs leading-5 text-quiet">
        We use your details to respond to this inquiry and keep a private record of your request. We do not sell these details.
        {siteConfig.schedulingUrl
          ? " A scheduling link is also available if you would rather pick a time directly."
          : ""}
      </p>
    </form>
  )
}

export function ContactAside({ initialPackage }: { initialPackage?: string }) {
  return (
    <aside className="space-y-6">
      <PackageSummary packageId={initialPackage} className="hidden lg:block" />
      <div className="bg-navy p-6 text-ivory">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-gold uppercase">
          What happens next
        </p>
        <ol className="mt-5 space-y-5">
          {expectations.map((item, index) => (
            <li key={item.title}>
              <p className="font-heading text-lg font-semibold">
                <span className="mr-2 text-gold">0{index + 1}</span>
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-silver">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
      {siteConfig.schedulingUrl ? (
        <p className="text-sm leading-6 text-quiet">
          Prefer to choose a time now?{" "}
          <a className="font-semibold text-gold-ink underline-offset-4 hover:underline" href={siteConfig.schedulingUrl}>
            Open the scheduling page
          </a>
          . That link is separate from this form.
        </p>
      ) : null}
    </aside>
  )
}

function PackageSummary({ packageId, className }: { packageId?: string; className?: string }) {
  const chosen = getPackage(packageId)
  if (!chosen) return null
  return <div className={cn("border border-navy/15 border-t-gold bg-paper p-5", className)} data-package-summary>
    <p className="text-xs tracking-[0.15em] text-gold-ink uppercase">Selected package</p>
    <p className="mt-2 font-heading text-2xl tracking-[-0.03em] text-navy">{chosen.name}</p>
    <p className="mt-2 text-sm leading-6 text-quiet">{formatMoney(chosen.setup)} setup · {formatMoney(chosen.monthly)} per month</p>
  </div>
}
