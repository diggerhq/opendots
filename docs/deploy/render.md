# Deploy to Render

Status: **spec validated, deploy not exercised.** `render.yaml` passes
`render blueprints validate` semantics offline against Render's published
JSON schema (`https://render.com/schema/render.yaml.json`, checked with ajv;
a wrong plan or field name fails the check) — the Render CLI itself needs a
workspace login to run the command. No Render account was available, so the
button and the deploy were not run.

What runs where: one web service built from the `Dockerfile`
(`runtime: docker`), a 1 GB persistent disk at `/data` for the session map
(`OPENDOTS_STATE_DIR=/data`), the health check on `/api/health`. Disks need
a paid instance (`plan: starter`); a free instance would have no disk and
would spin down.

Render is the one host that generates secret values: `render.yaml` marks
`OPENDOTS_OWNER_SECRET`, `OPENDOTS_COOKIE_SECRET` and `OPENDOTS_AGENT_SECRET`
`generateValue: true` (a base64 256-bit value each), and prompts only for
`OPENCOMPUTER_API_KEY` and `OPENCOMPUTER_PROJECT_ID` (`sync: false`). The app
registers the generated agent secret with the platform when you sign in.

## Steps

1. Locally, once: `npm ci && npx opencomputer login && npm run setup -- --target render`
   (links or creates the project and prints its id).
2. Click the button. The repository is private: install Render's GitHub App
   on it first (Render's docs: public repos work out of the box, private
   GitHub repos need the app).

   [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/diggerhq/opendots)

   Paste `OPENCOMPUTER_API_KEY` and `OPENCOMPUTER_PROJECT_ID` when prompted.
   Render prompts for `sync: false` values only when the Blueprint is first
   created.
3. When the service is live, copy its URL (`https://opendots-<suffix>.onrender.com`)
   and run `npm run setup -- --origin <that URL>` locally: it deploys the
   agents pinned to that origin.
4. Read `OPENDOTS_OWNER_SECRET` in the service's Environment tab in the Render
   dashboard; open the URL and sign in with it. The sign-in registers the
   installation secret for the origin.

Rotation: change `OPENDOTS_OWNER_SECRET` and `OPENDOTS_COOKIE_SECRET` in the
dashboard; every existing login stops working. Render does not regenerate
`generateValue` variables on later Blueprint syncs.
