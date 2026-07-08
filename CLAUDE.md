# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static multi-page business website for ProAir Zimbabwe (HVAC services in Harare). Plain HTML5/CSS3/vanilla JavaScript — no framework. Built with Vite 5, deployed to Netlify via CI/CD on every push to `main` (live site: proairzw.co.zw).

## Commands

```bash
npm run dev        # Vite dev server (auto-opens browser)
npm run build      # Production build to dist/ (also runs image optimization via Sharp/SVGO)
npm run preview    # Preview the production build
npm test           # Run all Vitest tests once
npm run test:watch # Vitest in watch mode
npx vitest --run js/components/MessageFormatter.test.js   # Run a single test file
```

Tests use Vitest + fast-check (property-based testing) and live alongside their modules in `js/components/*.test.js`. The HTML/CSS/page-level JS has no tests — only the WhatsApp message-formatting components are tested.

## Architecture

Four standalone pages (`index.html`, `about.html`, `services.html`, `contact.html`), each registered as a Rollup input in `vite.config.js`. Adding a page requires adding it there too.

Shared markup (navbar, footer, floating WhatsApp button) is **duplicated in each HTML file** — there is no templating. A change to the navbar or footer must be applied to all four pages.

CSS is split into shared layers loaded on every page (`css/global.css` for design tokens/typography, `css/components.css` for navbar/footer/buttons/cards, `css/effects.css` for particles/tilt/ripple) plus one page-specific stylesheet per page (`home.css`, `about.css`, etc.).

JS similarly: `js/main.js` (nav, scroll animations, active links) and `js/transitions.js` (page transitions) load everywhere; `js/effects.js` (particles, counters, tilt, typing, live Harare weather via Open-Meteo API) on pages with those effects; `js/contact.js` only on the contact page.

### WhatsApp integration

The core business feature: the contact form, CTAs, and floating button all deep-link to the business WhatsApp (0779 840 840). `js/contact.js` builds the pre-filled message using the tested components in `js/components/`:

- `MessageFormatter.js` — formats form data into the WhatsApp enquiry message
- `EmojiEncoder.js` — ensures emojis survive URL-encoding/WhatsApp (falls back to text symbols)
- `WhatsAppEmojis.js` — the whitelist of universally supported emojis

Emoji rendering in WhatsApp is a known fragile area (see `.kiro/specs/booking-system-enhancement/` for requirements/design/tasks of the ongoing booking-system work). Keep changes to these components covered by their tests.

## Cautions

- `css/tafara-portfolio/` is an unrelated Next.js project that ended up nested here (untracked in git). Ignore it — don't edit it, reference it, or commit it.
- SEO matters: pages carry meta tags, Open Graph, and Schema.org LocalBusiness JSON-LD — preserve these when editing `<head>` sections.
