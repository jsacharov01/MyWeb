# Deploy to Azure Static Web Apps + Azure Functions + ACS Email

## Resources
- Azure Static Web Apps (SWA) — hosts the Vite app and the Functions API
- Azure Communication Services (ACS) Email — sends email from the contact form
- GitHub Gist — ultra-simple JSON storage for blog likes (via Functions)

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

## Blog Likes (GitHub Gist storage)

The `api/blog-likes` function stores like counts in a private GitHub Gist as a JSON file.

### One-time setup
1) Create an empty private Gist
   - Go to https://gist.github.com/new
   - Filename: `likes.json`; Content: `{}`
   - Save and copy the Gist ID (the long hash in the URL).

2) Create a GitHub Personal Access Token (classic)
   - Go to GitHub → Settings → Developer settings → Personal access tokens (classic)
   - Generate new token with scope: `gist` only
   - Copy the token (it will be shown once)

3) Add app settings to Azure Static Web Apps → Configuration
   - `GITHUB_TOKEN` = the PAT from step 2 (scope: gist)
   - `BLOG_LIKES_GIST_ID` = the Gist ID from step 1
   - `BLOG_LIKES_GIST_FILE` = `likes.json` (optional; defaults to `likes.json`)
   - Optional rate limits:
     - `LIKES_RATE_WINDOW_MS` (default 60000)
     - `LIKES_RATE_MAX` (default 30)

### Local development for Likes
Add the same values to `api/local.settings.json` under `Values`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "ACS_CONNECTION_STRING": "<acs-connection-string>",
    "EMAIL_SENDER": "DoNotReply@<your-managed-domain>.azurecomm.net",
    "EMAIL_TO": "you@example.com",
    "GITHUB_TOKEN": "<your-github-pat-with-gist-scope>",
    "BLOG_LIKES_GIST_ID": "<your-gist-id>",
    "BLOG_LIKES_GIST_FILE": "likes.json"
  }
}
```

Run the Functions host from `api/`:

```bash
func start
```

If the host fails due to Node version, use Node 18 or 20 (Functions v4 compatible).

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
   - Likes (Production): `GET https://<your-swa>.azurestaticapps.net/api/blog-likes?slug=<slug>`
   - Email: use the contact form or call `/api/send-email` with required fields.

## Troubleshooting

- 500 on `/api/blog-likes`: ensure `GITHUB_TOKEN`, `BLOG_LIKES_GIST_ID` are set in SWA Configuration.
- 401/403 from GitHub API: verify the PAT has `gist` scope and the Gist is accessible.
- Comments widget not showing: verify Discussions is enabled, Giscus app authorized, and IDs in `Comments.tsx` are correct.
- Local Functions errors on startup: ensure Node 18 or 20 is used for the Functions host.
