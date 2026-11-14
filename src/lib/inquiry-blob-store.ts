import type { StoredInquiry } from "@/lib/inquiries"

export type InquiryObjectStore = {
  setJSON(key: string, value: StoredInquiry, options: { onlyIfNew: true }): Promise<{ modified: boolean }>
  get(key: string, options: { type: "json" }): Promise<StoredInquiry | null>
}

/** Immutable JSON documents: no public read endpoint or read-modify-write state. */
export async function saveBlobInquiry(record: StoredInquiry, store: InquiryObjectStore) {
  const key = `${record.id}.json`
  const { modified } = await store.setJSON(key, record, { onlyIfNew: true })
  if (modified) return { record, created: true, conflict: false }

  const existing = await store.get(key, { type: "json" })
  if (!existing || existing.id !== record.id) throw new Error("Saved inquiry could not be verified.")
  const sameInput = Object.keys(record).every((key) =>
    key === "createdAt" || existing[key as keyof StoredInquiry] === record[key as keyof StoredInquiry],
  )
  return { record: existing, created: false, conflict: !sameInput }
}
