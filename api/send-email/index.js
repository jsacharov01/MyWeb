const { EmailClient } = require("@azure/communication-email");

const acsConnectionString = process.env.ACS_CONNECTION_STRING;
const emailSender = process.env.EMAIL_SENDER;
const emailTo = process.env.EMAIL_TO;

// Simple in-memory rate limiting (per function instance)
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000); // 10 minutes
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX || 5); // 5 requests per window
const rateStore = new Map();

function getClientKey(req) {
  const h = req.headers || {};
  const fwd = h["x-forwarded-for"]; // may contain a list
  const ip = (typeof fwd === "string" && fwd.split(",")[0].trim())
    || h["x-client-ip"]
    || h["client-ip"]
    || h["x-real-ip"]
    || "unknown";
  const ua = h["user-agent"] || "";
  return `${ip}:${String(ua).slice(0, 32)}`;
}

const baseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "X-Robots-Tag": "noindex, nofollow, noarchive"
};

module.exports = async function (context, req) {
  if (req.method === "OPTIONS") {
    context.res = { status: 204, headers: baseHeaders };
    return;
  }

  if (req.method === "GET") {
    context.res = { status: 200, body: { ok: true }, headers: baseHeaders };
    return;
  }

  try {
    // Rate limit only POST (send attempts)
    if (req.method === "POST") {
      const key = getClientKey(req);
      const now = Date.now();
      let entry = rateStore.get(key);
      if (!entry || entry.resetAt <= now) {
        entry = { count: 0, resetAt: now + WINDOW_MS };
        rateStore.set(key, entry);
      }
      if (entry.count >= MAX_REQUESTS) {
        const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
        context.res = {
          status: 429,
          headers: {
            ...baseHeaders,
            "Retry-After": String(retryAfterSec),
            "X-RateLimit-Limit": String(MAX_REQUESTS),
            "X-RateLimit-Remaining": "0",
          },
          body: { error: "Příliš mnoho požadavků, zkuste to prosím později." },
        };
        return;
      }
      entry.count += 1;
    }

    if (!acsConnectionString || !emailSender) {
      context.log.error("Missing ACS configuration");
  context.res = { status: 500, body: { error: "Server email not configured" }, headers: baseHeaders };
      return;
    }

    const body = req.body;
    if (!body || typeof body !== "object") {
  context.res = { status: 400, body: { error: "Invalid JSON" }, headers: baseHeaders };
      return;
    }

  const name = String(body.name || "").trim();
  const fromEmail = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const hp = String(body.hp || "").trim();
  const startedAt = Number(body.startedAt || 0);
    const to = String(body.to || emailTo || "").trim();

    if (!name || !fromEmail || !message) {
  context.res = { status: 400, body: { error: "Chybí pole: jméno, email, zpráva" }, headers: baseHeaders };
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
  context.res = { status: 400, body: { error: "Neplatný email" }, headers: baseHeaders };
      return;
    }
    if (!to) {
  context.res = { status: 500, body: { error: "Příjemce není nakonfigurován" }, headers: baseHeaders };
      return;
    }

    // Anti-spam checks
    const now = Date.now();
    const minFillMs = 3000; // require at least 3s to fill the form
    const tooFast = Number.isFinite(startedAt) && startedAt > 0 ? (now - startedAt) < minFillMs : false;
    if (hp || tooFast) {
      // Silently accept but do not send email to avoid confirming to bots
      context.log.warn("Spam detected, skipping email send", { hpFilled: !!hp, tooFast });
      context.res = { status: 200, body: { ok: true }, headers: baseHeaders };
      return;
    }

    const client = new EmailClient(acsConnectionString);
    const subject = `New contact form submission from ${name}`;
    const text = `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`;

    const poller = await client.beginSend({
      senderAddress: emailSender,
      recipients: { to: [{ address: to }] },
      content: { subject, plainText: text }
    });
    const result = await poller.pollUntilDone();

    if (result.status === "Succeeded") {
      context.res = { status: 200, body: { ok: true }, headers: baseHeaders };
      return;
    }
    context.log.error("Email send failed", result);
    context.res = { status: 502, body: { error: "Failed to send" }, headers: baseHeaders };
  } catch (err) {
    context.log.error("Unhandled", err);
    context.res = { status: 500, body: { error: "Server error" }, headers: baseHeaders };
  }
};
