"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { ZAMBIAN_PROVINCES } from "@/lib/constants/locations";
import {
  LISTING_TYPE_LABELS,
  LISTING_TYPES,
  PROPERTY_TYPE_LABELS,
  PROPERTY_TYPES,
  type ListingType,
  type PropertySearchParams,
  type PropertyType,
} from "@/types/property";

interface PropertyFiltersProps {
  /** Currently applied filters (from the URL). */
  value: PropertySearchParams;
  /** Called with the new filters when the user applies or resets. */
  onApply: (filters: PropertySearchParams) => void;
}

/** Form-friendly representation: every field is a string. */
interface Draft {
  area: string;
  city: string;
  province: string;
  listingType: ListingType | "";
  propertyType: PropertyType | "";
  priceMin: string;
  priceMax: string;
  bedroomsMin: string;
}

const EMPTY_DRAFT: Draft = {
  area: "",
  city: "",
  province: "",
  listingType: "",
  propertyType: "",
  priceMin: "",
  priceMax: "",
  bedroomsMin: "",
};

function toDraft(value: PropertySearchParams): Draft {
  return {
    area: value.area ?? "",
    city: value.city ?? "",
    province: value.province ?? "",
    listingType: value.listingType ?? "",
    propertyType: value.propertyType ?? "",
    priceMin: value.priceMin?.toString() ?? "",
    priceMax: value.priceMax?.toString() ?? "",
    bedroomsMin: value.bedroomsMin?.toString() ?? "",
  };
}

function toNumber(text: string): number | undefined {
  const value = Number(text);
  return text !== "" && Number.isFinite(value) && value > 0 ? value : undefined;
}

function fromDraft(draft: Draft): PropertySearchParams {
  return {
    area: draft.area.trim() || undefined,
    city: draft.city.trim() || undefined,
    province: draft.province || undefined,
    listingType: draft.listingType || undefined,
    propertyType: draft.propertyType || undefined,
    priceMin: toNumber(draft.priceMin),
    priceMax: toNumber(draft.priceMax),
    bedroomsMin: toNumber(draft.bedroomsMin),
  };
}

const selectClassName =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white";

/**
 * Search filters supported by GET /properties. Edits are kept as a local draft and only
 * hit the API when applied, so typing doesn't fire a request per keystroke.
 * Remount with a `key` to resync the draft when the applied filters change elsewhere.
 */
export function PropertyFilters({ value, onApply }: PropertyFiltersProps) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(value));

  const update = <K extends keyof Draft>(key: K, next: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: next }));

  const isRental = draft.listingType === "rent";

  return (
    <form
      className="bg-white rounded-lg shadow-md p-6 mb-6 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onApply(fromDraft(draft));
      }}
    >
      <h2 className="text-lg font-bold text-gray-900">Filter Properties</h2>

      <Input
        id="filter-area"
        label="Area / Neighbourhood"
        placeholder="e.g., Kabulonga"
        value={draft.area}
        onChange={(e) => update("area", e.target.value)}
      />

      <Input
        id="filter-city"
        label="City / Town"
        placeholder="e.g., Lusaka"
        value={draft.city}
        onChange={(e) => update("city", e.target.value)}
      />

      <div>
        <label htmlFor="filter-province" className="block text-sm font-medium text-gray-700 mb-1">
          Province
        </label>
        <select
          id="filter-province"
          className={selectClassName}
          value={draft.province}
          onChange={(e) => update("province", e.target.value)}
        >
          <option value="">All provinces</option>
          {ZAMBIAN_PROVINCES.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-listing" className="block text-sm font-medium text-gray-700 mb-1">
          Listing Type
        </label>
        <select
          id="filter-listing"
          className={selectClassName}
          value={draft.listingType}
          onChange={(e) =>
            update("listingType", LISTING_TYPES.find((t) => t === e.target.value) ?? "")
          }
        >
          <option value="">Rent or buy</option>
          {LISTING_TYPES.map((type) => (
            <option key={type} value={type}>
              {LISTING_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 mb-1">
          Property Type
        </label>
        <select
          id="filter-type"
          className={selectClassName}
          value={draft.propertyType}
          onChange={(e) =>
            update("propertyType", PROPERTY_TYPES.find((t) => t === e.target.value) ?? "")
          }
        >
          <option value="">All types</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {PROPERTY_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-1">
          {isRental ? "Monthly rent (K)" : "Price (K)"}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            aria-label="Minimum price"
            placeholder={isRental ? "Min e.g. 3000" : "Min"}
            value={draft.priceMin}
            onChange={(e) => update("priceMin", e.target.value)}
            min="0"
          />
          <Input
            type="number"
            aria-label="Maximum price"
            placeholder={isRental ? "Max e.g. 15000" : "Max"}
            value={draft.priceMax}
            onChange={(e) => update("priceMax", e.target.value)}
            min="0"
          />
        </div>
      </fieldset>

      <div>
        <label htmlFor="filter-beds" className="block text-sm font-medium text-gray-700 mb-1">
          Bedrooms
        </label>
        <select
          id="filter-beds"
          className={selectClassName}
          value={draft.bedroomsMin}
          onChange={(e) => update("bedroomsMin", e.target.value)}
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={() => {
            setDraft(EMPTY_DRAFT);
            onApply({});
          }}
          className="flex-1 px-4 py-2 text-sm text-primary-600 border border-primary-500 rounded-lg hover:bg-primary-50 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
