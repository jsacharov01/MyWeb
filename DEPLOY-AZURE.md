# Deploy to Azure Static Web Apps + Azure Functions + ACS Email

## Resources
- Azure Static Web Apps (SWA) — hosts the Vite app and the Functions API
- Azure Communication Services (ACS) Email — sends email from the contact form

## Create resources
1. Create a Static Web App in Azure Portal and connect this GitHub repo.
   - App location: `/`
   - API location: `api`
   - Output location: `dist`
2. Create an Azure Communication Services resource and enable Email.
   - Set up a sender address (use the Azure-managed domain for quick start).

## Configure secrets in SWA
In the SWA resource -> Configuration, add as application settings:
- `ACS_CONNECTION_STRING` — from ACS Keys
- `EMAIL_SENDER` — the verified sender (e.g. DoNotReply@<domain>.azurecomm.net)
- `EMAIL_TO` — your recipient email

These will be available to the `api/` functions as environment variables.

## Local development
Copy `api/local.settings.json.example` to `api/local.settings.json` and fill values.

## Frontend usage
Use `sendContact` from `src/lib/contact.ts` to post to `/api/send-email`.
