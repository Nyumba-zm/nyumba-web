// src/lib/validations/contactSchemas.ts

import { z } from 'zod';

/**
 * Contact agent form validation schema
 */
export const contactAgentSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^\+?260\d{9}$|^0\d{9}$/,
      'Please enter a valid Zambian phone number (e.g., +260971234567 or 0971234567)'
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  propertyId: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']).default('phone'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).optional(),
});

export type ContactAgentFormData = z.infer<typeof contactAgentSchema>;

/**
 * Send message form validation schema
 */
export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be less than 5000 characters'),
  messageType: z.enum(['text', 'image', 'document']).default('text'),
});

export type SendMessageFormData = z.infer<typeof sendMessageSchema>;

/**
 * Start conversation form validation schema
 */
export const startConversationSchema = z.object({
  recipientId: z.string().uuid('Invalid recipient ID'),
  propertyId: z.string().uuid('Invalid property ID').optional(),
  initialMessage: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be less than 5000 characters'),
});

export type StartConversationFormData = z.infer<typeof startConversationSchema>;

/**
 * General inquiry form validation schema
 */
export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  category: z
    .enum(['general', 'support', 'feedback', 'partnership', 'other'])
    .default('general'),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

/**
 * Schedule viewing form validation schema
 */
export const scheduleViewingSchema = z.object({
  propertyId: z.string().uuid('Invalid property ID'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^\+?260\d{9}$|^0\d{9}$/,
      'Please enter a valid Zambian phone number'
    ),
  preferredDate: z
    .string()
    .min(1, 'Please select a preferred date'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
  alternateDate: z.string().optional(),
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
});

export type ScheduleViewingFormData = z.infer<typeof scheduleViewingSchema>;
