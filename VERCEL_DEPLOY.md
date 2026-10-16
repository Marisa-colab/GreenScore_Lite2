# Deploying GreenScore_Lite2 to Vercel

This document describes the minimal steps and configuration to deploy the GreenScore_Lite2 Vite React app to Vercel.

Files added in branch: `sync-from-greenscore-lite`

1) Vercel project settings (UI)
- Connect your GitHub account and import the repository: `Marisa-colab/GreenScore_Lite2`.
- Select the branch to deploy (recommended: `main` for production). I created a helper branch `sync-from-greenscore-lite` that contains the Vercel config — you can import this branch for a first deployment and then switch to `main`.
- Framework Preset: "Vite"
- Build Command: `npm run build`
- Output Directory: `dist`

2) Environment variables (add in Vercel > Settings > Environment Variables):
- GEMINI_API_KEY = <your secret Gemini API key>  (required for server-side Gemini calls)
- APP_URL = https://<your-vercel-project>.vercel.app  (set automatically after first deploy; used for callbacks/self-referential links)

Important: DO NOT commit secrets into the repository. Use Vercel environment variables or Vercel Secrets.

3) Vercel CLI (optional)
- Install: `npm i -g vercel`
- Link project: `vercel link` (choose the repo and project)
- Deploy (preview): `vercel --local-config vercel.json`
- Deploy production: `vercel --prod`
- Add env var with CLI: `vercel env add GEMINI_API_KEY production`

4) What I added to the repository
- vercel.json — config to use @vercel/static-build and set distDir to `dist`, plus a SPA route to index.html.
- .vercelignore — keeps node_modules, dist and secrets out of uploads.
- VERCEL_DEPLOY.md — this file (you are reading it).

5) Next manual steps (what you need to do)
- Go to Vercel dashboard → New Project → Import Git Repository → select `Marisa-colab/GreenScore_Lite2`.
- Set the Build Command to `npm run build` and Output Directory to `dist` if not auto-detected.
- Add the environment variables listed above (GEMINI_API_KEY and APP_URL). If your app uses additional env vars, add them too.
- Trigger a deploy (Vercel will automatically build and publish).

6) Notes & troubleshooting
- If the app needs server-side endpoints (Express/server.ts), you must deploy those separately (Cloud Run / Node) or convert to Serverless functions. Current vercel.json uses static-build which deploys only the frontend. If you want server endpoints on Vercel, we can convert server.ts into Vercel Serverless Functions (api/*) — ask me and I will prepare the conversion.
- If you see 404 on refresh, the SPA route in vercel.json redirects everything to index.html.

If you want, I can now:
- Open a Pull Request from `sync-from-greenscore-lite` into `main` with these changes.
- Convert the Express backend into Vercel serverless functions (if you prefer a single Vercel project hosting both frontend and server endpoints).

