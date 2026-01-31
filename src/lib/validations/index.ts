// src/lib/validations/index.ts

// Auth schemas
export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
  type ChangePasswordFormData,
  type UpdateProfileFormData,
} from './authSchemas';

// Property schemas
export {
  createPropertySchema,
  updatePropertySchema,
  propertyFilterSchema,
  propertyImageSchema,
  type CreatePropertyFormData,
  type UpdatePropertyFormData,
  type PropertyFilterFormData,
  type PropertyImageFormData,
} from './propertySchemas';

// Transaction schemas
export {
  createOfferSchema,
  respondToOfferSchema,
  counterOfferSchema,
  type CreateOfferFormData,
  type RespondToOfferFormData,
  type CounterOfferFormData,
} from './transactionSchemas';

// Contact schemas
export {
  contactAgentSchema,
  sendMessageSchema,
  startConversationSchema,
  inquirySchema,
  scheduleViewingSchema,
  type ContactAgentFormData,
  type SendMessageFormData,
  type StartConversationFormData,
  type InquiryFormData,
  type ScheduleViewingFormData,
} from './contactSchemas';
