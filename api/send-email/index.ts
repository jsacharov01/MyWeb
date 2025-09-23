import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { EmailClient } from "@azure/communication-email";

const acsConnectionString = process.env.ACS_CONNECTION_STRING;
const emailSender = process.env.EMAIL_SENDER; // from ACS (verified)
const emailTo = process.env.EMAIL_TO; // optional: default recipient

// Simple allowlist CORS; SWA will usually proxy, but safe for local
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function sendEmail(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (req.method === "OPTIONS") {
    return { status: 204, headers: corsHeaders };
  }

  try {
    if (!acsConnectionString || !emailSender) {
      context.error("Missing ACS configuration");
      return {
        status: 500,
        jsonBody: { error: "Server email not configured" },
        headers: corsHeaders
      };
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return { status: 400, jsonBody: { error: "Invalid JSON" }, headers: corsHeaders };
    }

    const name = String(body.name || "").trim();
    const fromEmail = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const to = String(body.to || emailTo || "").trim();

    if (!name || !fromEmail || !message) {
      return { status: 400, jsonBody: { error: "Missing fields: name, email, message" }, headers: corsHeaders };
    }
    // naive email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
      return { status: 400, jsonBody: { error: "Invalid email" }, headers: corsHeaders };
    }
    if (!to) {
      return { status: 500, jsonBody: { error: "Recipient not configured" }, headers: corsHeaders };
    }

    const client = new EmailClient(acsConnectionString);

    const subject = `New contact form submission from ${name}`;
    const text = `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`;

    const poller = await client.beginSend({
      senderAddress: emailSender!,
      recipients: { to: [{ address: to }] },
      content: { subject, plainText: text }
    });
    const result = await poller.pollUntilDone();

    if (result.status === "Succeeded") {
      return { status: 200, jsonBody: { ok: true }, headers: corsHeaders };
    }
    context.error("Email send failed", result);
    return { status: 502, jsonBody: { error: "Failed to send" }, headers: corsHeaders };
  } catch (err: any) {
    context.error("Unhandled", err);
    return { status: 500, jsonBody: { error: "Server error" }, headers: corsHeaders };
  }
}

app.http("send-email", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "send-email",
  handler: sendEmail
});
