import { execFileSync } from "node:child_process"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("../", import.meta.url))

export function validateNetlifyBuild(env) {
  if (env.NETLIFY !== "true") return
  if (env.INQUIRY_STORAGE !== "netlify-blobs") {
    throw new Error("Set INQUIRY_STORAGE=netlify-blobs with Builds and Functions scopes; local files are not durable on Netlify")
  }
  if (env.CONTEXT === "production") {
    const origin = new URL(env.NEXT_PUBLIC_SITE_URL || "")
    if (origin.protocol !== "https:" || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) {
      throw new Error("NEXT_PUBLIC_SITE_URL must be the approved HTTPS production origin")
    }
  }
}

export function buildInfo(env, git, version, now = new Date()) {
  validateNetlifyBuild(env)
  const supplied = env.COMMIT_REF?.trim()
  if (supplied && !/^[a-f0-9]{40,64}$/i.test(supplied)) throw new Error("Invalid COMMIT_REF")
  if (supplied && git.commit && supplied !== git.commit) throw new Error("COMMIT_REF differs from checkout")
  const commit = supplied || git.commit || null
  if (env.NETLIFY === "true" && (!commit || git.dirty !== false)) {
    throw new Error("Netlify releases require a known commit and a clean checkout")
  }
  const contexts = ["production", "deploy-preview", "branch-deploy", "dev", "preview-server"]
  const environments = ["local", "company-production", "company-preview"]
  return {
    commit,
    sourceDirty: git.dirty,
    builtAt: now.toISOString(),
    context: contexts.includes(env.CONTEXT) ? env.CONTEXT : "local",
    environment: environments.includes(env.VONTE_ENVIRONMENT) ? env.VONTE_ENVIRONMENT : "local",
    version,
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let commit = null
  let dirty = null
  try {
    commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim()
    dirty = Boolean(execFileSync("git", ["status", "--porcelain", "--untracked-files=normal"], { cwd: root, encoding: "utf8" }).trim())
  } catch { /* Archive-only local builds explicitly report unknown provenance. */ }
  const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"))
  const info = buildInfo(process.env, { commit, dirty }, version)
  mkdirSync(new URL("../public/", import.meta.url), { recursive: true })
  writeFileSync(new URL("../public/build-info.json", import.meta.url), `${JSON.stringify(info, null, 2)}\n`)
}
