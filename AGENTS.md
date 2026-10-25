# Repository Guidelines

## Project Structure & Module Organization

MandarinBridge is a bilingual tutoring landing page using React 19, Vite, and Tailwind CSS v4.

- `src/main.jsx` mounts React; `src/App.jsx` assembles sections.
- `src/components/` contains PascalCase section components, such as `Booking.jsx`.
- `src/i18n.jsx` owns UI translations and language persistence.
- `src/style.css` contains theme tokens and styles; `design.md` documents the design system.
- `public/assets/` stores images referenced as `/assets/...`.
- `worker/` handles booking; `wrangler.jsonc` configures Workers assets and KV.
- `tests/*.test.js` contains API tests. `dist/` is generated output.

## Build, Test, and Development Commands

- `npm ci`: install locked dependencies.
- `npm run dev`: start Vite, normally at `http://localhost:5173`.
- `npm run build`: generate production assets in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run dev:worker`: build and run the complete app with local KV.
- `npm test`: run Node's built-in tests with mocked KV/email services.
- `npm run deploy`: build and deploy; run only when explicitly requested.

Use Node `24.15.0`. Vite/preview lack `/api/booking`; use `dev:worker` for forms and rebuild after frontend edits.

## Coding Style & Naming Conventions

Use ES modules, functional React components, hooks, two-space indentation, single-quoted JavaScript strings, and omitted semicolons. Use camelCase for variables/functions. No formatter or lint script is configured.

Add both `zh` and `en` entries to `src/i18n.jsx`; render copy through `useI18n().t(key)`. Keep design tokens in `@theme`, update `design.md` alongside visual changes, and place element resets in `@layer base`. Preserve the 980px/640px breakpoints. Synchronize section IDs, navigation links, and scrollspy entries. Clean up timers, listeners, and observers in effects.

## Testing Guidelines

Use Node's built-in runner; no coverage threshold applies. Cover validation, routing, KV/email failures, timeouts, and background notifications. Run `npm test`, the production build, and `npx wrangler deploy --dry-run`. Check both languages, mobile layouts, navigation, carousel, FAQ, and booking states. Document checks in PRs.

## Commit & Pull Request Guidelines

Use focused Chinese commit descriptions, following history's `重构：` or `视觉优化` prefixes where appropriate. PRs should describe behavior changes, link issues, list validation, and include screenshots for visual changes.

Preserve concurrent edits. Commit or push only when requested. Exclude generated output, dependencies, local secrets, and tool data.

## Security & Configuration

`BOOKINGS` provisions on first deployment. Configure runtime `RESEND_API_KEY`/`NOTIFY_EMAIL` in Cloudflare or ignored `.dev.vars`; optional `RESEND_FROM_EMAIL` selects the sender. Never commit credentials or booking data. Return promptly after KV success; notify via `waitUntil` with a five-second timeout. Log no personal data.
