const fetch = require("node-fetch");

const baseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "X-Robots-Tag": "noindex, nofollow, noarchive"
};

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // define as secret in SWA
const GIST_ID = process.env.BLOG_LIKES_GIST_ID; // the gist id
const GIST_FILE = process.env.BLOG_LIKES_GIST_FILE || "likes.json";

// simple per-instance rate limit
const WINDOW_MS = Number(process.env.LIKES_RATE_WINDOW_MS || 60_000);
const MAX_REQ = Number(process.env.LIKES_RATE_MAX || 30);
const rateStore = new Map();

function getKey(h) {
  const fwd = h["x-forwarded-for"]; const ip = (typeof fwd === "string" && fwd.split(",")[0].trim()) || h["x-real-ip"] || "unknown";
  const ua = h["user-agent"] || "";
  return `${ip}:${String(ua).slice(0,32)}`;
}

async function getGistJson() {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, { headers: { Authorization: `token ${GITHUB_TOKEN}`, "User-Agent": "myweb-blog-likes" } });
  if (!res.ok) throw new Error(`Gist fetch failed: ${res.status}`);
  const data = await res.json();
  const file = data.files && data.files[GIST_FILE];
  const content = file && file.content ? file.content : "{}";
  try { return JSON.parse(content); } catch { return {}; }
}

async function updateGistJson(obj) {
  const body = { files: { [GIST_FILE]: { content: JSON.stringify(obj, null, 2) } } };
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: { Authorization: `token ${GITHUB_TOKEN}`, "User-Agent": "myweb-blog-likes", "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Gist update failed: ${res.status}`);
}

module.exports = async function (context, req) {
  if (req.method === "OPTIONS") {
    context.res = { status: 204, headers: baseHeaders }; return;
  }

  const slug = String(req.query?.slug || "").trim();
  if (!slug) { context.res = { status: 400, headers: baseHeaders, body: { error: "Missing slug" } }; return; }

  // Rate limiting
  const now = Date.now();
  const key = getKey(req.headers || {});
  let entry = rateStore.get(key);
  if (!entry || entry.resetAt <= now) { entry = { c:0, resetAt: now + WINDOW_MS }; rateStore.set(key, entry); }
  if (entry.c >= MAX_REQ) { context.res = { status: 429, headers: baseHeaders, body: { error: "Too many requests" } }; return; }
  entry.c += 1;

  if (!GITHUB_TOKEN || !GIST_ID) {
    context.res = { status: 500, headers: baseHeaders, body: { error: "Server not configured" } }; return;
  }

  try {
    const store = await getGistJson();
    if (req.method === "GET") {
      const count = Number(store?.[slug]?.count || 0);
      context.res = { status: 200, headers: baseHeaders, body: { count } }; return;
    }
    if (req.method === "POST") {
      const current = Number(store?.[slug]?.count || 0);
      const next = current + 1;
      store[slug] = { count: next };
      await updateGistJson(store);
      context.res = { status: 200, headers: baseHeaders, body: { count: next } }; return;
    }
    context.res = { status: 405, headers: baseHeaders, body: { error: "Method not allowed" } };
  } catch (e) {
    context.log.error(e);
    context.res = { status: 500, headers: baseHeaders, body: { error: "Server error" } };
  }
};
