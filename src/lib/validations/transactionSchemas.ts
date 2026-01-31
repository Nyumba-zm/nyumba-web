// src/lib/validations/transactionSchemas.ts

import { z } from 'zod';

/**
 * Create offer form validation schema
 */
export const createOfferSchema = z.object({
  propertyId: z.string().uuid('Invalid property ID'),
  amount: z
    .number({ message: 'Offer amount must be a number' })
    .positive('Offer amount must be greater than 0'),
  currency: z.enum(['ZMW', 'USD']).default('ZMW'),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
  expiresInDays: z
    .number()
    .int()
    .min(1, 'Offer must be valid for at least 1 day')
    .max(30, 'Offer can be valid for maximum 30 days')
    .default(7),
});

export type CreateOfferFormData = z.infer<typeof createOfferSchema>;

/**
 * Respond to offer form validation schema
 */
export const respondToOfferSchema = z
  .object({
    action: z.enum(['accept', 'reject', 'counter'], {
      message: 'Please select an action',
    }),
    counterAmount: z
      .number({ message: 'Counter amount must be a number' })
      .positive('Counter amount must be greater than 0')
      .optional(),
    counterMessage: z
      .string()
      .max(1000, 'Message must be less than 1000 characters')
      .optional(),
  })
  .refine(
    (data) => data.action !== 'counter' || data.counterAmount !== undefined,
    {
      message: 'Counter amount is required when countering an offer',
      path: ['counterAmount'],
    }
  );

export type RespondToOfferFormData = z.infer<typeof respondToOfferSchema>;

/**
 * Counter offer form validation schema
 */
export const counterOfferSchema = z.object({
  counterAmount: z
    .number({ message: 'Counter amount must be a number' })
    .positive('Counter amount must be greater than 0'),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

export type CounterOfferFormData = z.infer<typeof counterOfferSchema>;
