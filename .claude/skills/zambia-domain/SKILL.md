---
name: zambia-domain
description: Zambia-specific business rules and reference data for Nyumba — currency, phone format, provinces, cities/areas, property types, realistic seed/fixture data. Use when writing validation, fixtures, seed data, copy, or anything location/money related.
---

# Zambia domain reference

Nyumba is Zambian. Kenya-isms (KES, +254, county, Nairobi) are bugs — fix them when seen.

- **Currency**: ZMW (Zambian Kwacha), symbol `K`. Store amounts as numeric, display as
  `K 2,500,000`. USD may appear for high-end listings but ZMW is the default.
- **Phone**: E.164 `+260` followed by 9 digits; mobile prefixes 95x/96x/97x/76x/77x.
  Accept `0971234567` input and normalise to `+260971234567`. WhatsApp link:
  `https://wa.me/260971234567`.
- **Provinces (10)**: Central, Copperbelt, Eastern, Luapula, Lusaka, Muchinga, Northern,
  North-Western, Southern, Western. Field name is `province`.
- **Major cities**: Lusaka, Kitwe, Ndola, Kabwe, Chingola, Mufulira, Livingstone, Chipata,
  Kasama, Solwezi, Mansa, Mongu.
- **Lusaka areas** (good fixture data): Kabulonga, Woodlands, Roma, Ibex Hill, Leopards
  Hill, Rhodes Park, Olympia, Kalundu, Chelston, Avondale, Meanwood, Silverest, Makeni.
- **Coordinates**: Lusaka ≈ (-15.4167, 28.2833). Zambia lat -8 to -18, lng 22 to 34.
- **Common amenities**: borehole, solar/backup power (load-shedding), security/guard,
  electric fence, parking, garden, servants' quarters, swimming pool.
- **Land/title**: Ministry of Lands title deeds; leasehold (99 years typical);
  non-citizens generally need consent to acquire land.
- **Finance**: Bank of Zambia (BOZ) regulates lenders; mortgage players include Zanaco,
  Stanbic, Absa, FNB, Atlas Mara/ABZ, ZNBS.

Backend fixtures: `../nyumba-backend/tests/conftest.py`. Frontend reference data: `src/lib/constants/locations.ts`, `src/lib/data/`.
