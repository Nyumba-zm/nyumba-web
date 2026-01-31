// src/lib/api/services/communicationService.ts

import { apiClient } from '../client';
import type { BackendPaginatedResponse, PaginatedResponse, PaginationParams } from '@/types/api';
import type {
  Conversation,
  Message,
  Notification,
  BackendConversation,
  BackendMessage,
  BackendNotification,
  CreateMessageDto,
  StartConversationDto,
} from '@/types/communication';

/**
 * Transform backend conversation to frontend format
 */
function transformConversation(backend: BackendConversation): Conversation {
  return {
    id: backend.id,
    propertyId: backend.property_id,
    participants: backend.participants.map((p) => ({
      id: p.id,
      firstName: p.first_name,
      lastName: p.last_name,
      fullName: `${p.first_name} ${p.last_name}`,
      avatarUrl: p.avatar_url,
    })),
    lastMessage: backend.last_message
      ? {
          content: backend.last_message.content,
          sentAt: backend.last_message.sent_at,
          senderId: backend.last_message.sender_id,
        }
      : undefined,
    unreadCount: backend.unread_count,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
  };
}

/**
 * Transform backend message to frontend format
 */
function transformMessage(backend: BackendMessage): Message {
  return {
    id: backend.id,
    conversationId: backend.conversation_id,
    senderId: backend.sender_id,
    content: backend.content,
    messageType: backend.message_type,
    attachments: backend.attachments?.map((a) => ({
      id: a.id,
      type: a.type,
      url: a.url,
      filename: a.filename,
      size: a.size,
      mimeType: a.mime_type,
    })),
    isRead: backend.is_read,
    createdAt: backend.created_at,
  };
}

/**
 * Transform backend notification to frontend format
 */
function transformNotification(backend: BackendNotification): Notification {
  return {
    id: backend.id,
    userId: backend.user_id,
    type: backend.type,
    title: backend.title,
    body: backend.body,
    data: backend.data,
    isRead: backend.is_read,
    createdAt: backend.created_at,
  };
}

/**
 * Communication service
 */
export const communicationService = {
  // ===== Conversations =====

  /**
   * Get user's conversations
   */
  async getConversations(): Promise<Conversation[]> {
    const response = await apiClient.get<BackendPaginatedResponse<BackendConversation>>(
      '/communications/conversations'
    );
    return response.items.map(transformConversation);
  },

  /**
   * Get a single conversation by ID
   */
  async getConversationById(conversationId: string): Promise<Conversation> {
    const response = await apiClient.get<BackendConversation>(
      `/communications/conversations/${conversationId}`
    );
    return transformConversation(response);
  },

  /**
   * Start a new conversation
   */
  async startConversation(data: StartConversationDto): Promise<Conversation> {
    const response = await apiClient.post<BackendConversation>(
      '/communications/conversations',
      {
        recipient_id: data.recipientId,
        property_id: data.propertyId,
        initial_message: data.initialMessage,
      }
    );
    return transformConversation(response);
  },

  // ===== Messages =====

  /**
   * Get messages in a conversation
   */
  async getMessages(
    conversationId: string,
    params?: PaginationParams & { before?: string }
  ): Promise<PaginatedResponse<Message>> {
    const response = await apiClient.get<BackendPaginatedResponse<BackendMessage>>(
      `/communications/conversations/${conversationId}/messages`,
      {
        before: params?.before,
        limit: params?.pageSize || 50,
      }
    );

    const totalPages = Math.ceil(response.total / response.page_size);
    return {
      items: response.items.map(transformMessage),
      total: response.total,
      page: response.page,
      pageSize: response.page_size,
      totalPages,
      hasMore: response.page < totalPages,
    };
  },

  /**
   * Send a message in a conversation
   */
  async sendMessage(
    conversationId: string,
    data: CreateMessageDto,
    attachments?: File[]
  ): Promise<Message> {
    if (attachments?.length) {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('message_type', data.messageType || 'text');
      attachments.forEach((file) => formData.append('attachments', file));

      const response = await apiClient.uploadFile<BackendMessage>(
        `/communications/conversations/${conversationId}/messages`,
        formData
      );
      return transformMessage(response);
    }

    const response = await apiClient.post<BackendMessage>(
      `/communications/conversations/${conversationId}/messages`,
      {
        content: data.content,
        message_type: data.messageType || 'text',
      }
    );
    return transformMessage(response);
  },

  /**
   * Mark messages as read
   */
  async markMessagesAsRead(conversationId: string): Promise<void> {
    await apiClient.post(`/communications/conversations/${conversationId}/read`);
  },

  // ===== Notifications =====

  /**
   * Get user's notifications
   */
  async getNotifications(): Promise<{
    items: Notification[];
    unreadCount: number;
  }> {
    const response = await apiClient.get<{
      items: BackendNotification[];
      total: number;
      unread_count: number;
    }>('/communications/notifications');

    return {
      items: response.items.map(transformNotification),
      unreadCount: response.unread_count,
    };
  },

  /**
   * Mark a notification as read
   */
  async markNotificationAsRead(notificationId: string): Promise<void> {
    await apiClient.post(`/communications/notifications/${notificationId}/read`);
  },

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsAsRead(): Promise<void> {
    await apiClient.post('/communications/notifications/read-all');
  },

  /**
   * Get unread notification count
   */
  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>(
      '/communications/notifications/unread-count'
    );
    return response.count;
  },
};
