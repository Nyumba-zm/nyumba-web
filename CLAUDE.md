# nyumba-web — CLAUDE.md

Next.js 16 / React 19 app for **Nyumba**, a **Zambian** real estate platform
(branch history: `jack-frontend`). It overlaps with `../nyumba-frontend`.

## Status: secondary frontend
**`../nyumba-frontend` is the single build target for the demo.** This repo is kept
correct and building, and is a source of UI ideas to port — but new demo features
(see `demo-scope` skill) are built in nyumba-frontend, not here.

Work that *does* belong here:
- Keeping it correct against the real backend contract (`../nyumba-backend`).
- Zambia correctness (province not county, ZMW, +260).
- Lint/type/build health.
- Extracting good components for porting (document them; don't build parked features).

**Parked — don't extend**: offers, services marketplace, messaging, bookings, finance,
valuations, neighbourhood insights.

## Engineering standard
Senior-engineer quality: strict types (no `any`/`@ts-ignore`), one source of truth for
API shapes, no dead code or commented-out blocks, every change leaves lint + typecheck +
build green.

## Stack
Next.js 16 App Router, React 19 (React Compiler), TypeScript, Tailwind v4, TanStack Query v5,
Zustand v5, React Hook Form + Zod v4, axios, Leaflet + Google Maps. No test runner configured.

## Commands
```bash
npm install
npm run dev          # :3000
npm run lint
npx tsc --noEmit
npm run build
```

## Layout
```
src/app/<route>/page.tsx        flat routes (no route groups)
src/components/{ui,layout,property,landing,shared,auth,theme,features/*}  PascalCase files
src/lib/api/client.ts           ApiClient class: base URL, bearer token, single-flight 401 refresh
                                (stores rotated refresh token), error mapping. NO key-case transform.
src/lib/api/services/*.ts       authService, propertyService (only endpoints the backend has)
src/lib/api/transformers/*.ts   the ONLY place backend JSON ↔ frontend models are converted
src/lib/hooks/                  TanStack Query hooks; keys in queryKeys.ts
src/lib/search/                 URL-synced search params
src/store/                      Zustand stores (tokens live in client.ts storage only)
src/types/                      frontend (camelCase) + Backend* (snake_case, exact wire shape:
                                flat `address_*` in responses, decimals as strings)
```

## API layer rule
`Backend*` types must match `../nyumba-backend/.../presentation/schemas.py` field for field.
Never reintroduce automatic snake↔camel conversion — map explicitly in transformers.

## Known gaps
- No server-side sort param, so sort reorders the current page only.
- No edit-listing screen (`useUpdateProperty` exists, unused).
- Saved properties are device-local (no backend endpoint).
- `/demo`, `/neighborhood`, `/finance` still show static/illustrative numbers (parked).
- AuthGuard has a hydration quirk (auth store loads from localStorage).
- Demo-scope fields (`address_area`, `last_confirmed_available_at`) are optional until the
  backend ships them.

## Environment
`NEXT_PUBLIC_API_URL` (default `http://localhost:8000/api/v1`). `.env*` is gitignored.

## Skills
`.claude/skills/`: `demo-scope`, `zambia-domain`, `verify-web`.
