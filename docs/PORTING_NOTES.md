# Porting notes: nyumba-web → nyumba-frontend

`nyumba-frontend` is the demo build target. These are the pieces of this repo that are
worth porting for the demo scope (rental search + WhatsApp enquiry, quick posting, Verified
badge, availability check). Nothing listed here has been ported yet.

nyumba-frontend uses shadcn/ui, kebab-case files and snake_case API types, so every port
means restyling with its `components/ui/*` primitives and renaming to its conventions.

## Worth porting

| Component | Path here | Why | What has to change |
|---|---|---|---|
| LocationAutocomplete | `src/components/landing/LocationAutocomplete.tsx` (+ `src/lib/constants/locations.ts`) | A real dropdown with grouped "Popular searches" and `Area, City` suggestions that returns structured `{city, area}`. nyumba-frontend uses a plain `<datalist>`, which can't group, style or tell an area from a city. | Restyle as a shadcn `Popover` + `Command` combobox. Source suggestions from frontend's `lib/utils/constants.ts` (launch areas first), not this repo's `ZAMBIAN_CITIES`. Add keyboard navigation (arrow keys / Enter / Escape) and `role="combobox"`/`aria-expanded`, which it lacks today. `onChange(display, city?, area?)` is already the right shape for `?area=&city=`. |
| QuickFilterPills | `src/components/landing/QuickFilterPills.tsx` | Rent/Buy toggle plus property-type pills: quicker on a phone than selects. Works for a hero search or the top of the results page. | Swap to shadcn `ToggleGroup`/`Badge`. Take the property types from frontend's `PropertyType` union (here they already match the backend enum). Add `aria-pressed`. Default stays `rent`. |
| PropertySort + `sortProperties` | `src/components/property/PropertySort.tsx` | Typed sort options with a pure sort function and a result count. nyumba-frontend has no sort control. | Use a shadcn `Select`. The backend has **no sort parameter** (results are newest first), so price and bedroom sorts only reorder the current page. Either keep that and label it, or add `sort=` to `GET /properties` in the backend first. |
| `useSavedPropertyIds` | `src/lib/hooks/useSavedPropertyIds.ts` | A heart/save that works with no backend: `useSyncExternalStore` over localStorage, synced across components and tabs. | Port as is, adding `"use client"` if needed. Saved *searches* are parked; this only covers saved listings. |
| Property search URL helpers | `src/lib/search/propertySearchUrl.ts` | Parse and build `/properties?...` with validated enums, so the URL is the single source of truth for filters. | Compare with frontend's `lib/search/search-params.ts` and merge rather than duplicate. Key names must match the routes there. |
| `normalizeZambianPhone` / `formatPhoneNumber` | `src/lib/utils/format.ts` | Accepts `0971234567`, `971234567`, `+260 97 123 4567` and returns E.164 `+260971234567`, which `RegisterRequest.phone` requires. | Move into frontend's `lib/utils/formatters.ts` if it lacks an equivalent, and use it in the register and listing forms before submitting. |

## Not worth porting

- **VerificationBadge** (`src/components/features/verification/VerificationBadge.tsx`):
  nyumba-frontend already has `components/properties/verified-badge.tsx`. The only idea here
  is the `owner`/`agent`/`listing` label variants. Port those only if the demo needs a badge
  on the lister as well as the listing.
- **KYCStatus** (`src/components/features/verification/KYCStatus.tsx`): its statuses
  (`pending`/`verified`/`rejected`/`not_started`) map onto `GET /verification/me`
  `id_status` (`pending`/`verified`/`rejected`/`none`). It's a small styled pill, so it's
  simpler to rebuild it with shadcn `Badge` than to port it.
- **ContactModal** (`src/components/property/ContactModal.tsx`): frontend already has
  `whatsapp-button.tsx`. Only the call/email fallbacks for sellers without WhatsApp might
  be worth copying.
- **InteractiveMap** (`src/components/shared/InteractiveMap.tsx`): it runs on hard-coded
  demo data; frontend has `results-map.tsx` and `location-map.tsx`.
- Everything under `src/components/features/finance`, `.../neighborhood` and the
  `/finance`, `/neighborhood`, `/demo` pages are parked features.
