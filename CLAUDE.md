# CLAUDE.md — Ganesh.dev

Ganesh's personal portfolio, live at https://ganeshsuthar.dev (Vercel, auto-deploys from GitHub). Repo: GaneshSuthar007/Ganesh.dev, branch `main`.

Vite 6 + React 18, no router, no CSS framework. "Ops-console" theme with live GitHub telemetry.

```bash
npm install
npm run dev       # local
npm run build     # production build; the check gate (no tests, no lint)
```

## Layout

Single-component architecture: almost everything is in `src/Portfolio.jsx` (SEO config at the top). `src/main.jsx` just mounts it. Static assets and SEO files in `public/` (`ganesh.jpg`, `favicon.svg`, `robots.txt`, `sitemap.xml`).

## Notes

- The domain `https://ganeshsuthar.dev/` is referenced in `index.html` (canonical, og tags, JSON-LD), `src/Portfolio.jsx`, `robots.txt`, `sitemap.xml`. Keep them in sync if anything changes.
- Keep it as one component unless Ganesh asks to split it.
- Pushing to `main` deploys to production for the site: ask before pushing.
