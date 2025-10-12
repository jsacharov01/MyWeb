# MyWeb

This is a Vite + React site. See DEPLOY-AZURE.md for deployment steps to Azure Static Web Apps with a serverless API for the contact form.

## Blog a komentáře

- Blog články jsou Markdown soubory ve `src/blog/posts/` s frontmatter (title, date, slug, excerpt).
- Stránky:
	- `/blog` – seznam
	- `/blog/:slug` – detail
- Komentáře přes Giscus (GitHub Discussions) – nastav v `.env` hodnoty `VITE_GISCUS_*` (viz `.env.example`).

## Lokální běh (frontend + Functions)

1) Frontend
	 ```bash
	 npm install
	 npm run dev
	 ```

2) Azure Functions API
	 - Nainstaluj Azure Functions Core Tools v4 a používej Node 18/20 (např. `export PATH="/opt/homebrew/opt/node@20/bin:$PATH"`).
		 - Vyplň `api/local.settings.json` (viz `api/local.settings.json.example`).
	 ```bash
	 cd api
	 npm install
	 func start
	 # Pokud je 7071 obsazený: func start --port 7073
	 ```

3) Propojení frontendu na lokální Functions
	 - V kořeni vytvoř `.env` (nebo uprav) a nastav `VITE_API_BASE`, např.:
		 ```
		 VITE_API_BASE=http://localhost:7073
		 ```
	 - Restartuj `npm run dev`.

## Giscus (komentáře)

- Na https://giscus.app vygeneruj `repoId` a `categoryId` pro repo a kategorii.
- Zapiš je do `.env` (`VITE_GISCUS_REPO_ID`, `VITE_GISCUS_CATEGORY_ID`).
- V repu zapni Discussions a povol Giscus GitHub App pro dané repo.

## Bezpečnost

- `api/local.settings.json` necommituj (tajné hodnoty)! V Azure vlož stejné klíče do App Settings.
