// src/lib/utils/property.ts

import type { Property } from '@/types/property';

/** "Kabulonga, Lusaka" — falls back to "Lusaka, Lusaka Province" when no area is known. */
export function formatLocation(property: Pick<Property, 'area' | 'city' | 'province'>): string {
  return property.area
    ? `${property.area}, ${property.city}`
    : `${property.city}, ${property.province} Province`;
}

/** Full address line for the detail page. */
export function formatFullAddress(
  property: Pick<Property, 'street' | 'area' | 'city' | 'province'>
): string {
  return [property.street, property.area, property.city, `${property.province} Province`]
    .filter(Boolean)
    .join(', ');
}

/**
 * WhatsApp deep link with the enquiry text pre-filled.
 * `baseLink` is the backend's `seller_whatsapp_link` (https://wa.me/260XXXXXXXXX).
 */
export function buildWhatsAppEnquiryLink(
  baseLink: string,
  property: Pick<Property, 'title'>,
  url: string
): string {
  const text = `Hi, is this still available? ${property.title} ${url}`;
  return `${baseLink}?text=${encodeURIComponent(text)}`;
}

/** Absolute URL of a listing, for share/enquiry text. Relative during SSR. */
export function listingUrl(propertyId: string): string {
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  return `${origin}/properties/${propertyId}`;
}
