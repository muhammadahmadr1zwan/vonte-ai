import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { after, before, describe, it } from "node:test"
import { getStore } from "@netlify/blobs"
import { BlobsServer } from "@netlify/blobs/server"
import { saveBlobInquiry } from "../src/lib/inquiry-blob-store"
import { createInquiryRecord, type StoredInquiry } from "../src/lib/inquiries"

const input = { fullName:"Deployment QA", businessName:"VONTE QA", email:"qa@example.test", phone:"2025550123", industry:"home-services", website:"", packageId:"ai-receptionist", challenge:"Verify the inquiry delivery workflow.", contactMethod:"email", consent:"yes" } as const
let dir: string
let server: BlobsServer
let edgeURL: string
before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "vonte-blobs-"))
  server = new BlobsServer({directory:dir,token:"local-test-only",logger:()=>{}})
  const address = await server.start()
  edgeURL = `http://127.0.0.1:${address.port}`
})
after(async () => { await server.stop(); await rm(dir,{recursive:true,force:true}) })
function store(name: string) {
  return getStore({name,siteID:"local-test-site",token:"local-test-only",edgeURL,uncachedEdgeURL:edgeURL,consistency:"strong"})
}

describe("Netlify inquiry objects", () => {
  it("saves and reads an actual JSON document through the Blobs SDK", async () => {
    const record = createInquiryRecord(input)
    const storage = store("qa-storage")
    assert.equal((await saveBlobInquiry(record, storage)).created, true)
    const saved: StoredInquiry = await storage.get(`${record.id}.json`,{type:"json"})
    assert.deepEqual(saved, record)
  })
  it("reuses the saved record on retries without overwriting the timestamp", async () => {
    const storage = store("qa-retry")
    const record = createInquiryRecord(input)
    await saveBlobInquiry(record,storage)
    const result = await saveBlobInquiry({...record,createdAt:"2030-01-01T00:00:00Z"},storage)
    assert.equal(result.created,false)
    assert.equal(result.conflict,false)
    assert.equal(result.record.createdAt,record.createdAt)
  })
  it("keeps the original object when a request ID is reused with changed details", async () => {
    const storage = store("qa-conflict")
    const record = createInquiryRecord(input)
    await saveBlobInquiry(record,storage)
    const result = await saveBlobInquiry({...record,businessName:"Changed business"},storage)
    assert.equal(result.conflict,true)
    assert.equal(result.record.businessName,input.businessName)
  })
  it("isolates production documents from the preview namespace", async () => {
    const record = createInquiryRecord(input)
    await saveBlobInquiry(record,store("qa-production"))
    assert.equal(await store("qa-preview").get(`${record.id}.json`,{type:"json"}),null)
  })
  it("propagates storage failures so the form cannot report fake success", async () => {
    await assert.rejects(saveBlobInquiry(createInquiryRecord(input),{
      async setJSON() { throw new Error("Store unavailable") },
      async get() { return null },
    }),/Store unavailable/)
  })
})
