# Deploy runbook

Every step here needs one of your own accounts, so they are written for you to
run rather than automated.

Order matters: domain → API → site → demo wiring.

---

## 1. Domain

Buy `farroshilmisyafei.com` (or `farros.dev`). Registrar barely matters;
Cloudflare Registrar sells at cost and Niagahoster/Hostinger are fine.

Then move DNS to Cloudflare (free plan) even if you bought elsewhere. You want
Cloudflare in front of the API for rate limiting — that is the whole reason.

Set the real domain in [`src/content/site.ts`](src/content/site.ts) → `site.url`.

---

## 2. OCR API

The published image already runs standalone:

```bash
docker pull ghcr.io/farroshsy/computervision-api-system:latest
```

**Where to run it.** PaddleOCR pulls in a heavy native stack, so serverless
platforms with small image limits are out. Two workable options:

- **Google Cloud Run** — scales to zero, so an idle demo costs nothing. Give it
  2 GB memory and a 60s request timeout. Cold starts are slow (10–20s) with an
  OCR image this size; set `min-instances=0` and accept it, or `=1` and pay.
- **A small VPS** (Biznet, Contabo, Hetzner) — 2 vCPU / 4 GB, run the compose
  file, put Caddy in front for TLS. Predictable cost, no cold start.

Cloud Run, roughly:

```bash
gcloud run deploy doc-verify \
  --image ghcr.io/farroshsy/computervision-api-system:latest \
  --memory 2Gi --cpu 2 --timeout 60 --port 8000 \
  --allow-unauthenticated --region asia-southeast2
```

Point `api.<yourdomain>` at whatever you chose, proxied through Cloudflare
(orange cloud on).

### Lock it down before it is public

The demo endpoint is an unauthenticated CPU-heavy image processor on the open
internet. Untended, it is someone else's free compute.

1. **API key.** Keep auth on and issue one key for the site. It lives in the
   site's server environment, never in the browser (see step 4).
2. **Cloudflare rate limit** on `api.<yourdomain>/api/v1/*` — 10 requests per
   minute per IP is generous for a demo and useless for abuse.
3. **Cloudflare WAF**: block requests whose `Origin` is not your site, and
   consider restricting to countries you care about.
4. **Cap request body size** at the edge (~6 MB), matching the proxy limit.

### Privacy

The API is stateless and that is a real property, not marketing — but verify it
holds in your deployment before pointing the world at it:

- no volume mounted for uploads
- image bytes never hit the application log at any log level
- platform request logging does not capture request bodies (Cloud Run's default
  does not; check if you add a logging sidecar)

These are national identity documents. Under UU PDP, storing them turns you into
a data processor with obligations you do not want attached to a portfolio demo.
Not storing them is how you stay out of that entirely.

---

## 3. Site on Vercel

```bash
cd farros-portfolio
git init && git add -A && git commit -m "feat: portfolio site"
gh repo create farros-portfolio --public --source=. --push   # or push manually
```

Import the repo at vercel.com. Framework auto-detects. Then
Settings → Domains → add your domain, and set the records Vercel gives you at
Cloudflare:

| Type  | Name  | Value                    | Proxy |
| ----- | ----- | ------------------------ | ----- |
| A     | `@`   | `76.76.21.21`            | DNS only |
| CNAME | `www` | `cname.vercel-dns.com`   | DNS only |

Vercel needs DNS-only (grey cloud) for its own certificate issuance. Only the
API subdomain goes through the Cloudflare proxy.

---

## 4. Wire up the demo

In Vercel → Settings → Environment Variables:

| Name           | Value                      | Notes |
| -------------- | -------------------------- | ----- |
| `OCR_API_BASE` | `https://api.<yourdomain>` | no trailing slash |
| `OCR_API_KEY`  | your API key               | server-only, never `NEXT_PUBLIC_` |

Neither is exposed to the browser: uploads go to `/api/demo/ocr` on your own
origin, which forwards server-side. That is also why the API needs no CORS
configuration.

Leave `OCR_API_BASE` unset and the widget returns a clean "not configured"
message instead of breaking the page — safe to ship the site before the API is
up.

### Sample images

`SAMPLES` in [`src/components/ocr-demo.tsx`](src/components/ocr-demo.tsx) is
empty on purpose. Add **synthetic or heavily redacted** documents to
`public/samples/` and list them there. A one-click sample is what makes the demo
work for a reviewer who has no Indonesian ID to hand — and it means nobody feels
invited to upload a real one.

Never put a real KTP/SIM/STNK/KIR in `public/` — it would be served publicly and
permanently, and cached beyond your control.

---

## 5. GitHub cleanup

```bash
export GITHUB_TOKEN=ghp_...
python3 github/cleanup_repos.py            # review the plan
python3 github/cleanup_repos.py --apply
```

Then, by hand:

1. Copy `github/PROFILE_README.md` into the `farroshsy/farroshsy` repo as
   `README.md`. This replaces the generated template — the current one has a
   broken LinkedIn link (`linkedin.com/in/https://www.linkedin.com/in/...`).
2. Pin six repos on your profile (Customize your pins). Pinning is a GraphQL-only
   API and takes ten seconds in the UI, so it is not scripted. Suggested order:
   `computervision-api-system`, `hcie-system`, `farros-portfolio`,
   `threejs-starter`, `AutoClaim`, `WebGL_Grafkom`.
3. Add topics and a homepage URL to the two featured repos — both are empty
   right now, and topics are how people find them.

---

## 6. Before you call it done

- [ ] `npm run build` passes
- [ ] Demo works end to end from the deployed site, not just locally
- [ ] Rate limit verified — hit it deliberately and confirm you get a 429
- [ ] `/cv.pdf` exists in `public/` (the CV page links to it)
- [ ] OG image looks right: paste your URL into a Slack or WhatsApp message
- [ ] Lighthouse pass on mobile
- [ ] Site loads in both light and dark theme
