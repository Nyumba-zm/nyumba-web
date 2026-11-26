---
name: verify-web
description: Checks to run before calling nyumba-web work done — lint, typecheck, production build, and backend contract alignment. Use at the end of every change in this repo.
---

# Verify nyumba-web

```bash
npm run lint
npx tsc --noEmit
npm run build
```
Fix errors properly — no `any`, `@ts-ignore`, or disabled lint rules to get green.

Contract check for anything touching the API: compare against
`../nyumba-backend/src/nyumba/*/presentation/{routes,schemas}.py` — HTTP method, path,
field names (`province`, never `county`), and response envelope
(`{properties, total, page, page_size}` for lists).

Manual pass if possible: changed pages render at desktop and ~375px width with no console
errors. Report what ran and what didn't.
