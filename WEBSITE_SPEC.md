# FOXELYX website — static v1

This build is a **static export**. There is no FOXELYX backend.

## Decisions that override the longer build spec

- `output: 'export'` in `next.config.ts`. No Server Actions, no `app/api`, no middleware, no `cookies()` or `headers()`.
- Contact form opens `mailto:info@foxelyx.com`. It does not post to Zoho or an email API.
- No IP region bar. The header switcher is a link to `/in`, `/ae`, `/uk`, `/ie`, or that region's contact page.
- Prices are "Custom quote". No `Offer` schema.
- No `LocalBusiness` schema until an office has street, city, and phone that match its Google Business Profile.
- `/work` and `/blog` are `noindex` until real case studies and articles exist.
- Regional service URLs are not generated. Service pages link to the regional home instead.
- 301s for `/clients`, `/clients/:id`, `/search`, and `/brand/:id` are in `public/.htaccess` and `vercel.json`. `next.config.ts` redirects apply in `next dev` only.
- Region homes are real routes (`app/in`, `app/ae`, `app/uk`, `app/ie`), not a `[region]` param, so an unknown URL is a 404. Service slugs use `dynamicParams = false`.

## Still to build from the motion spec

Hero slat images, expertise accordion, logo marquee, stats, testimonials, case-study stack, and Lenis-driven image strip. Those wait on original photos and confirmed numbers. Do not use another site's images.
