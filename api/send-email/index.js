const { EmailClient } = require("@azure/communication-email");

const acsConnectionString = process.env.ACS_CONNECTION_STRING;
const emailSender = process.env.EMAIL_SENDER;
const emailTo = process.env.EMAIL_TO;

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
    const to = String(body.to || emailTo || "").trim();

    if (!name || !fromEmail || !message) {
  context.res = { status: 400, body: { error: "Missing fields: name, email, message" }, headers: baseHeaders };
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
  context.res = { status: 400, body: { error: "Invalid email" }, headers: baseHeaders };
      return;
    }
    if (!to) {
  context.res = { status: 500, body: { error: "Recipient not configured" }, headers: baseHeaders };
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
