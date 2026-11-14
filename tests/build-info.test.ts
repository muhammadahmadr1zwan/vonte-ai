import { test } from "node:test"
import assert from "node:assert/strict"
import { buildInfo, validateNetlifyBuild } from "../scripts/build-info.mjs"

const commit = "a".repeat(40)
test("release metadata identifies the clean checkout without copying environment secrets", () => {
  const info = buildInfo({ NETLIFY: "true", INQUIRY_STORAGE: "netlify-blobs", NEXT_PUBLIC_SITE_URL: "https://example.com", COMMIT_REF: commit, CONTEXT: "production", VONTE_ENVIRONMENT: "company-production", RESEND_API_KEY: "private-value" }, { commit, dirty: false }, "0.1.0", new Date("2026-11-14T00:00:00Z"))
  assert.deepEqual(info, { commit, sourceDirty: false, builtAt: "2026-11-14T00:00:00.000Z", context: "production", environment: "company-production", version: "0.1.0" })
})
test("releases reject unknown, dirty and mismatched source identity", () => {
  assert.throws(() => buildInfo({ NETLIFY: "true", INQUIRY_STORAGE: "netlify-blobs" }, { commit: null, dirty: null }, "0.1.0"), /known commit/)
  assert.throws(() => buildInfo({ NETLIFY: "true", INQUIRY_STORAGE: "netlify-blobs" }, { commit, dirty: true }, "0.1.0"), /clean checkout/)
  assert.throws(() => buildInfo({ COMMIT_REF: "b".repeat(40) }, { commit, dirty: false }, "0.1.0"))
  assert.throws(() => buildInfo({ COMMIT_REF: "not-a-sha" }, { commit, dirty: false }, "0.1.0"))
})
test("local metadata marks edits and does not expose arbitrary context strings", () => {
  const info = buildInfo({ CONTEXT: "private-value", VONTE_ENVIRONMENT: "private-value" }, { commit, dirty: true }, "0.1.0")
  assert.equal(info.sourceDirty, true)
  assert.equal(info.context, "local")
  assert.equal(info.environment, "local")
})
test("Netlify builds refuse ephemeral inquiry storage and an absent production origin", () => {
  assert.throws(() => validateNetlifyBuild({ NETLIFY: "true" }), /INQUIRY_STORAGE/)
  assert.throws(() => validateNetlifyBuild({ NETLIFY: "true", INQUIRY_STORAGE: "netlify-blobs", CONTEXT: "production" }))
  assert.throws(() => validateNetlifyBuild({ NETLIFY: "true", INQUIRY_STORAGE: "netlify-blobs", CONTEXT: "production", NEXT_PUBLIC_SITE_URL: "http://example.com" }), /HTTPS/)
  assert.doesNotThrow(() => validateNetlifyBuild({ NETLIFY: "true", INQUIRY_STORAGE: "netlify-blobs", CONTEXT: "deploy-preview" }))
  assert.doesNotThrow(() => validateNetlifyBuild({}))
})
