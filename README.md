# FOXELYX website

Static Next.js site. There is no application backend. The contact form opens the visitor's email app.

```bash
npm run dev
npm run build
```

`npm run build` writes the site to `out/`. Upload that folder. Apache rules are in `public/.htaccess` (copied into `out/`). They 301 the old `/clients`, `/search`, and `/brand` URLs and do not send every unknown path to `index.html`.

Do not publish placeholder prices, fake testimonials, or office streets. India phone and `info@foxelyx.com` are the public contact details.
