// src/types/communication.ts

/**
 * Message type
 */
export type MessageType = 'text' | 'image' | 'document' | 'offer_notification';

/**
 * Notification type
 */
export type NotificationType =
  | 'offer_received'
  | 'offer_accepted'
  | 'offer_rejected'
  | 'offer_countered'
  | 'offer_expired'
  | 'message_received'
  | 'property_viewed'
  | 'property_saved'
  | 'system';

/**
 * Conversation participant
 */
export interface ConversationParticipant {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl?: string;
}

/**
 * Backend participant format
 */
export interface BackendConversationParticipant {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

/**
 * Message attachment
 */
export interface Attachment {
  id: string;
  type: 'image' | 'document';
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * Backend attachment format
 */
export interface BackendAttachment {
  id: string;
  type: 'image' | 'document';
  url: string;
  filename: string;
  size: number;
  mime_type: string;
}

/**
 * Frontend message format
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  attachments?: Attachment[];
  isRead: boolean;
  createdAt: string;
  // Populated sender info
  sender?: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
}

/**
 * Backend message format
 */
export interface BackendMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  attachments?: BackendAttachment[];
  is_read: boolean;
  created_at: string;
  sent_at?: string;
}

/**
 * Frontend conversation format
 */
export interface Conversation {
  id: string;
  propertyId?: string;
  participants: ConversationParticipant[];
  lastMessage?: {
    content: string;
    sentAt: string;
    senderId: string;
  };
  unreadCount: number;
  createdAt: string;
  updatedAt?: string;
  // Populated property info
  property?: {
    id: string;
    title: string;
    primaryImage?: string;
  };
}

/**
 * Backend conversation format
 */
export interface BackendConversation {
  id: string;
  property_id?: string;
  participants: BackendConversationParticipant[];
  last_message?: {
    content: string;
    sent_at: string;
    sender_id: string;
  };
  unread_count: number;
  created_at: string;
  updated_at?: string;
}

/**
 * Frontend notification format
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: {
    offerId?: string;
    propertyId?: string;
    conversationId?: string;
    messageId?: string;
    [key: string]: unknown;
  };
  isRead: boolean;
  createdAt: string;
}

/**
 * Backend notification format
 */
export interface BackendNotification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

/**
 * Create message DTO
 */
export interface CreateMessageDto {
  content: string;
  messageType?: MessageType;
}

/**
 * Start conversation DTO
 */
export interface StartConversationDto {
  recipientId: string;
  propertyId?: string;
  initialMessage: string;
}

/**
 * Notification type labels
 */
export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  offer_received: 'New Offer',
  offer_accepted: 'Offer Accepted',
  offer_rejected: 'Offer Rejected',
  offer_countered: 'Counter Offer',
  offer_expired: 'Offer Expired',
  message_received: 'New Message',
  property_viewed: 'Property Viewed',
  property_saved: 'Property Saved',
  system: 'System',
};

/**
 * Notification type icons (for UI)
 */
export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, string> = {
  offer_received: 'currency-dollar',
  offer_accepted: 'check-circle',
  offer_rejected: 'x-circle',
  offer_countered: 'arrow-path',
  offer_expired: 'clock',
  message_received: 'chat-bubble-left',
  property_viewed: 'eye',
  property_saved: 'heart',
  system: 'bell',
};
