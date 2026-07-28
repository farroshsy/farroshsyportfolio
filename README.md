# farros-portfolio

Personal site. Next.js 16 (App Router) · TypeScript · Tailwind v4 · deployed on
Vercel.

```bash
npm install
npm run dev
```

## Where things live

| What | Where |
| --- | --- |
| Name, tagline, links, intro copy | `src/content/site.ts` |
| Projects, metrics, case-study prose | `src/content/projects.ts` |
| Live OCR demo widget | `src/components/ocr-demo.tsx` |
| Server-side proxy to the OCR API | `src/app/api/demo/ocr/route.ts` |
| Deploy steps | `DEPLOY.md` |
| GitHub profile README + cleanup script | `github/` |

Copy edits should almost always be in `src/content/` — the components read from
there and nothing else hardcodes your details.

## Adding a project

Append to `projects` in `src/content/projects.ts`. `featured: true` gives it a
card on the home page and a full case-study route at `/work/<slug>`;
`featured: false` puts it in the short "Also" list. Routes are generated from
the array, so there is no page file to add.

Case-study bodies support `**bold**` and nothing else — deliberately not a
Markdown pipeline, since the content is short and typed.

## Notes

- **No shadcn/ui.** Components are hand-written. Fewer dependencies than the
  design surface justifies here.
- **Theme** follows `prefers-color-scheme`, with a toggle that writes
  `data-theme` on `<html>` and persists to `localStorage`. `ThemeScript` in the
  document head applies it before paint so there is no flash.
- **The demo proxies server-side.** The API key never reaches the browser and
  the API needs no CORS rules. Size, MIME type, and doctype are validated before
  anything is forwarded.
