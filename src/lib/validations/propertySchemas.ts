// src/lib/validations/propertySchemas.ts
//
// Limits mirror CreatePropertyRequest in nyumba-backend (properties/presentation/schemas.py).
// Description is capped at 2000 to satisfy both the current backend (20–5000) and the
// demo-scope contract (optional, max 2000).

import { z } from 'zod';
import { ZAMBIAN_PROVINCES } from '@/lib/constants/locations';
import { LISTING_TYPES, PROPERTY_TYPES } from '@/types/property';

const wholeNumber = (label: string) =>
  z
    .number({ message: `${label} must be a number` })
    .int(`${label} must be a whole number`)
    .min(0, `${label} cannot be negative`)
    .max(50, `Maximum 50 ${label.toLowerCase()}`);

export const createPropertySchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .trim()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  propertyType: z.enum(PROPERTY_TYPES, { message: 'Please select a property type' }),
  listingType: z.enum(LISTING_TYPES, { message: 'Please select rent or sale' }),
  price: z
    .number({ message: 'Price is required' })
    .positive('Price must be greater than 0'),
  isNegotiable: z.boolean(),
  street: z.string().trim().min(1, 'Street address is required').max(255),
  area: z.string().trim().max(100).optional(),
  city: z.string().trim().min(1, 'City is required').max(100),
  province: z.enum(ZAMBIAN_PROVINCES, { message: 'Please select a province' }),
  bedrooms: wholeNumber('Bedrooms'),
  bathrooms: wholeNumber('Bathrooms'),
  areaSqm: z
    .number({ message: 'Size must be a number' })
    .positive('Size must be greater than 0'),
});

/** Raw form values (before Zod transforms). */
export type CreatePropertyFormInput = z.input<typeof createPropertySchema>;
/** Validated form values. */
export type CreatePropertyFormData = z.output<typeof createPropertySchema>;
