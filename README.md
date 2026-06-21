# حاضنة رائدات — Raedat Incubator

Arabic (RTL) marketing site for **حاضنة رائدات**, the women's entrepreneurship incubator of أكاديمية المرأة العُمانية (Omani Women's Academy).

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Motion** (Framer Motion) — page transitions + gallery lightbox
- **Lenis** — smooth scrolling
- Self-hosted fonts via `next/font` (Milan Display Black + Tajawal)

## Pages

`/` home · `/about` · `/program` · `/impact` · `/news` · `/news/[slug]` (article + gallery)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Notes

- Theme palette lives in `app/globals.css` `:root`.
- Content/data in `lib/data.ts`; source material in `content.md` and `raedat_news_package/`.
- `perftest.mjs` / `shot.mjs` are local dev utilities (Playwright) for perf + screenshots.
