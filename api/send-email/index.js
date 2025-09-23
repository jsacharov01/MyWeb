const { EmailClient } = require("@azure/communication-email");

const acsConnectionString = process.env.ACS_CONNECTION_STRING;
const emailSender = process.env.EMAIL_SENDER;
const emailTo = process.env.EMAIL_TO;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

module.exports = async function (context, req) {
  if (req.method === "OPTIONS") {
    context.res = { status: 204, headers: corsHeaders };
    return;
  }

  try {
    if (!acsConnectionString || !emailSender) {
      context.log.error("Missing ACS configuration");
      context.res = { status: 500, body: { error: "Server email not configured" }, headers: corsHeaders };
      return;
    }

    const body = req.body;
    if (!body || typeof body !== "object") {
      context.res = { status: 400, body: { error: "Invalid JSON" }, headers: corsHeaders };
      return;
    }

    const name = String(body.name || "").trim();
    const fromEmail = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const to = String(body.to || emailTo || "").trim();

    if (!name || !fromEmail || !message) {
      context.res = { status: 400, body: { error: "Missing fields: name, email, message" }, headers: corsHeaders };
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
      context.res = { status: 400, body: { error: "Invalid email" }, headers: corsHeaders };
      return;
    }
    if (!to) {
      context.res = { status: 500, body: { error: "Recipient not configured" }, headers: corsHeaders };
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
      context.res = { status: 200, body: { ok: true }, headers: corsHeaders };
      return;
    }
    context.log.error("Email send failed", result);
    context.res = { status: 502, body: { error: "Failed to send" }, headers: corsHeaders };
  } catch (err) {
    context.log.error("Unhandled", err);
    context.res = { status: 500, body: { error: "Server error" }, headers: corsHeaders };
  }
};
