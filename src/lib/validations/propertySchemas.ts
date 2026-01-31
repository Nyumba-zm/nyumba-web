// src/lib/validations/propertySchemas.ts

import { z } from 'zod';

/**
 * Property types
 */
const propertyTypes = [
  'apartment',
  'house',
  'land',
  'commercial',
  'townhouse',
  'villa',
  'studio',
] as const;

/**
 * Address validation schema
 */
const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  county: z.string().min(1, 'Province/County is required'),
  country: z.string().default('Zambia'),
  postalCode: z.string().optional(),
});

/**
 * Create property form validation schema
 */
export const createPropertySchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  propertyType: z.enum(propertyTypes, {
    message: 'Please select a property type',
  }),
  listingType: z.enum(['sale', 'rent'], {
    message: 'Please select sale or rent',
  }),
  price: z
    .number({ message: 'Price must be a number' })
    .positive('Price must be greater than 0'),
  currency: z.enum(['ZMW', 'USD']).default('ZMW'),
  isNegotiable: z.boolean().default(false),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  county: z.string().min(1, 'Province is required'),
  country: z.string().default('Zambia'),
  postalCode: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  bedrooms: z
    .number({ message: 'Bedrooms must be a number' })
    .int('Bedrooms must be a whole number')
    .min(0, 'Bedrooms cannot be negative')
    .max(50, 'Maximum 50 bedrooms'),
  bathrooms: z
    .number({ message: 'Bathrooms must be a number' })
    .int('Bathrooms must be a whole number')
    .min(0, 'Bathrooms cannot be negative')
    .max(50, 'Maximum 50 bathrooms'),
  areaSqm: z
    .number({ message: 'Size must be a number' })
    .positive('Size must be greater than 0'),
  yearBuilt: z
    .number()
    .int()
    .min(1800, 'Year built must be after 1800')
    .max(new Date().getFullYear(), 'Year built cannot be in the future')
    .optional(),
  amenities: z.array(z.string()).optional().default([]),
  features: z.array(z.string()).optional().default([]),
});

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;

/**
 * Update property form validation schema
 */
export const updatePropertySchema = createPropertySchema.partial();

export type UpdatePropertyFormData = z.infer<typeof updatePropertySchema>;

/**
 * Property filter form validation schema
 */
export const propertyFilterSchema = z
  .object({
    searchQuery: z.string().optional(),
    propertyType: z.array(z.enum(propertyTypes)).optional(),
    listingType: z.enum(['sale', 'rent']).optional(),
    priceMin: z.number().positive().optional(),
    priceMax: z.number().positive().optional(),
    bedroomsMin: z.number().int().min(0).optional(),
    bedroomsMax: z.number().int().min(0).optional(),
    bathroomsMin: z.number().int().min(0).optional(),
    bathroomsMax: z.number().int().min(0).optional(),
    city: z.string().optional(),
    county: z.string().optional(),
    amenities: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      !data.priceMin || !data.priceMax || data.priceMin <= data.priceMax,
    {
      message: 'Minimum price cannot be greater than maximum price',
      path: ['priceMax'],
    }
  )
  .refine(
    (data) =>
      !data.bedroomsMin ||
      !data.bedroomsMax ||
      data.bedroomsMin <= data.bedroomsMax,
    {
      message: 'Minimum bedrooms cannot be greater than maximum',
      path: ['bedroomsMax'],
    }
  );

export type PropertyFilterFormData = z.infer<typeof propertyFilterSchema>;

/**
 * Property image upload validation
 */
export const propertyImageSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, 'At least one image is required')
    .max(20, 'Maximum 20 images allowed')
    .refine(
      (files) => files.every((file) => file.size <= 10 * 1024 * 1024),
      'Each image must be less than 10MB'
    )
    .refine(
      (files) =>
        files.every((file) =>
          ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
        ),
      'Only JPEG, PNG, and WebP images are allowed'
    ),
});

export type PropertyImageFormData = z.infer<typeof propertyImageSchema>;
