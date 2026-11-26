---
name: demo-scope
description: The Nyumba demo product scope and the shared backend↔frontend API contract for it — rental search with WhatsApp enquiry, two-minute phone posting with share link/image, Verified badge, 7-day "still available?" check, price-always-shown / no-viewing-fees rule — plus what is parked. Read before building or prioritising any feature.
---

# Nyumba demo scope

**Positioning**: the only place to find homes in Zambia that are *real, still available and
priced upfront* — for renters tired of Facebook/WhatsApp-group scams (fake agents charging
viewing fees, copied photos, taken houses, "DM for price").
**Strategy**: don't fight Facebook, feed it. Posting on Nyumba must be faster than Facebook,
and every listing produces a share link + image agents post to Facebook groups and WhatsApp
status, so every click lands on a listing we can vouch for.
**Launch market**: 2–3 high-search neighbourhoods (near universities / middle-income areas,
e.g. Lusaka: Kalundu/UNZA, Chelston, Woodlands, Kabulonga, Meanwood, Rhodes Park).
**Proof metrics to make measurable**: verified listings per area, enquiries per week,
listings marked rented.

**Build target**: `nyumba-backend` + `nyumba-frontend`. `nyumba-web` and `Nyumba-App` are
not where demo features are built.

## PARKED — do not build
Offers, services marketplace, in-app messaging, bookings, mortgage/finance, valuations,
neighbourhood insights, saved searches. If you find yourself building one of these, stop.

---

## Feature 1 — Search + WhatsApp enquiry
- Filters: **area** (neighbourhood), city, price range, bedrooms, property type,
  listing type (default **rent**), and **map bounds**. Results list + map view.
- Only `active` listings appear in search.
- Every card and detail page has a **WhatsApp** button opening
  `https://wa.me/260XXXXXXXXX?text=<prefilled>` where the text includes the listing title
  and its Nyumba URL ("Hi, is this still available? <url>").
- Clicking it records an enquiry (proof metric).

Contract:
```
GET  /api/v1/properties
     ?area=&city=&province=&listing_type=&property_type=&min_price=&max_price=
     &min_bedrooms=&max_bedrooms=&min_lat=&max_lat=&min_lng=&max_lng=&page=&page_size=
     → PropertyListResponse {properties: PropertyResponse[], total, page, page_size}
POST /api/v1/properties/{id}/enquiries          (no auth)
     body {channel: "whatsapp" | "phone"}  → 201 {id, property_id, channel, created_at}
```
`address.area` (string, optional, e.g. "Kabulonga") is added to the Address value object
and persisted; search on it is case-insensitive.

## Feature 2 — Post a listing from a phone in two minutes
- One mobile-first screen: photos (camera/gallery, ≥1 required to publish), area + city,
  price (ZMW, per month for rent), bedrooms, bathrooms, property type, optional short
  description, "no viewing fees" confirmation. Title auto-generated client-side if blank
  ("3 bedroom house in Kabulonga").
- Flow: create → upload images → publish, in one submit; then a **share screen**.
- **Share screen**: copy link, "Share to WhatsApp" (`https://wa.me/?text=`), "Share to
  Facebook" (`https://www.facebook.com/sharer/sharer.php?u=`), and a downloadable
  **share image** (photo + price + beds + area + Verified badge + Nyumba branding).
- Share image/OG: frontend `src/app/(main)/properties/[id]/opengraph-image.tsx`
  (Next `ImageResponse`, 1200×630) so links unfurl nicely on Facebook/WhatsApp; the same
  route is used as the downloadable image. Detail page sets OG/Twitter metadata.

Backend: description becomes optional (max 2000); title required (frontend generates it).

## Feature 3 — Verified badge
A listing is **Verified** only when BOTH:
1. the lister's ID was checked (`users.id_verified_at` set by an admin after the lister
   uploads an ID photo), and
2. someone has physically seen the property (`properties.inspected_at`, `inspected_by`
   set by an admin).

Contract:
```
POST /api/v1/verification/id-document           (auth, multipart file) → 202 {status:"pending"}
GET  /api/v1/verification/me                    (auth) → {id_status: "none"|"pending"|"verified"|"rejected"}
POST /api/v1/admin/users/{id}/verify-id         (admin) body {approved: bool, note?}
POST /api/v1/admin/properties/{id}/inspection   (admin) body {inspected: bool, note?}
GET  /api/v1/admin/verification/queue           (admin) → pending IDs + uninspected active listings
```
`PropertyResponse` gains:
```
is_verified: bool                       # computed: lister ID verified AND inspected
verification: {lister_id_verified: bool, property_inspected: bool, inspected_at: str|null}
```
ID images go to S3 (LocalStack) under a private prefix — never returned publicly.

## Feature 4 — "Still available?" check (every 7 days)
- On publish and on every "yes", set `last_confirmed_available_at = now`.
- A job finds active listings with `last_confirmed_available_at` older than
  `AVAILABILITY_CHECK_DAYS` (7) and no open check → creates an `AvailabilityCheck`
  (random URL-safe token, sent_at) and sends SMS/WhatsApp through a
  **`NotificationSender` port**. Dev/test adapter = fake that logs and stores messages
  (no real SMS/WhatsApp provider yet).
- Message: "Nyumba: is your 2-bed in Kalundu (K4,500/month) still available? Yes: <link-yes>
  No: <link-no>". Links hit a public token endpoint.
- **Yes** → confirmed, timer resets. **No** → listing status `rented` (rent) / `sold` (sale).
- **Silence** for `AVAILABILITY_GRACE_DAYS` (3) → listing status `inactive` with
  `hidden_reason = "unconfirmed"`; owner can re-confirm from dashboard to reactivate.
- Owner can confirm anytime from the dashboard.

Contract:
```
POST /api/v1/availability/{token}               (no auth) body {available: bool} → 200 {status}
GET  /api/v1/availability/{token}               (no auth) → {property_title, area, price, status}  # for the landing page
POST /api/v1/properties/{id}/confirm-availability   (owner) → PropertyResponse
POST /api/v1/admin/availability/run             (admin) → {checks_sent, listings_hidden}
CLI: python -m nyumba.jobs.availability_checks  (same use case; cron later)
```
`PropertyResponse` gains `last_confirmed_available_at: str|null`, `hidden_reason: str|null`.
UI shows "Confirmed available 3 days ago" on cards/detail. Frontend page
`/availability/[token]` shows the listing and big Yes / No buttons (works without login).

## Feature 5 — Price always shown, no viewing fees
- `price_amount` required and > 0; there is no "price on request".
- Publishing requires `no_viewing_fee_confirmed = true` (BusinessRuleViolation otherwise).
- Detail page shows a "No viewing fees on Nyumba — report anyone who asks" notice and a
  **Report** button:
```
POST /api/v1/properties/{id}/reports            (no auth) body {reason: "viewing_fee"|"not_available"|"fake"|"wrong_price"|"other", details?}
GET  /api/v1/admin/reports                      (admin)
```

## Roles & admin
`UserRole` already has `admin`. Admin endpoints check role in the use case
(`AuthorizationException`). Frontend gets a minimal `/dashboard/admin` (verification queue,
reports, "run availability checks") visible only to admins.

## Seed data
`python -m nyumba.scripts.seed` (backend) creates an admin, 3 agents with +260 phones, and
~20 rental listings across 3 Lusaka areas with coordinates, mixed verified/unverified, one
with an overdue availability check. Idempotent.
