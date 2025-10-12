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

---

## CI/CD flow (GitHub Actions)

- This repo contains a workflow at `.github/workflows/azure-static-web-apps-*.yml`.
- It triggers on push to `master` and deploys automatically to Production.
- Pull Requests to `master` create a Preview environment.
- Build settings in the workflow are already aligned with this project:
  - `app_location: "/"`
  - `api_location: "api"`
  - `output_location: "dist"`

Verify the workflow has access to the Azure Static Web Apps deploy token secret
`AZURE_STATIC_WEB_APPS_API_TOKEN_*` (created when connecting the SWA to this repo).


## Comments (Giscus)

The Comments component (`src/components/Comments.tsx`) uses Giscus (GitHub Discussions) mapped by post slug.

### One-time setup
1) Enable Discussions on your GitHub repository (Settings → General → Features → Discussions).

2) Go to https://giscus.app and select your repo
   - Choose a category to store discussions (e.g., `General`)
   - Copy the generated `repoId` and `categoryId`

3) Update the constants in `src/components/Comments.tsx`:
   - `GISCUS_REPO` = `owner/repo` (e.g., `jsacharov01/MyWeb`)
   - `GISCUS_REPO_ID` = value from giscus.app
   - `GISCUS_CATEGORY` = the chosen category name (e.g., `General`)
   - `GISCUS_CATEGORY_ID` = value from giscus.app

4) Install/authorize the Giscus GitHub App for your repo when prompted.

Deploy, and the comment widget should render under each post.

## End-to-end check

1) Push to `master` → GitHub Actions should build and deploy.
2) Visit your SWA URL:
   - Verify main site loads and blog routes work (`/blog`, `/blog/<slug>`).
3) Test API endpoints:
   - Email: use the contact form or call `/api/send-email` with required fields.

## Troubleshooting

- Comments widget not showing: verify Discussions is enabled, Giscus app authorized, and IDs in `Comments.tsx` are correct.
- Local Functions errors on startup: ensure Node 18 or 20 is used for the Functions host.
