// src/lib/hooks/useCommunications.ts

'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { communicationService } from '@/lib/api';
import { queryKeys } from './queryKeys';
import type { CreateMessageDto, StartConversationDto } from '@/types/communication';

// ===== Conversations =====

/**
 * Hook to get user's conversations
 */
export function useConversations() {
  return useQuery({
    queryKey: queryKeys.communications.conversations.list(),
    queryFn: () => communicationService.getConversations(),
    refetchInterval: 30000, // Poll every 30 seconds
  });
}

/**
 * Hook to get a single conversation
 */
export function useConversation(conversationId: string) {
  return useQuery({
    queryKey: queryKeys.communications.conversations.detail(conversationId),
    queryFn: () => communicationService.getConversationById(conversationId),
    enabled: !!conversationId,
  });
}

/**
 * Hook to start a new conversation
 */
export function useStartConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StartConversationDto) =>
      communicationService.startConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.conversations.all(),
      });
    },
  });
}

// ===== Messages =====

/**
 * Hook to get messages in a conversation with infinite scroll
 */
export function useMessages(conversationId: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.communications.messages(conversationId),
    queryFn: ({ pageParam }) =>
      communicationService.getMessages(conversationId, {
        before: pageParam as string | undefined,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore || lastPage.items.length === 0) return undefined;
      return lastPage.items[lastPage.items.length - 1].createdAt;
    },
    enabled: !!conversationId,
    initialPageParam: undefined as string | undefined,
  });
}

/**
 * Hook to send a message
 */
export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      data,
      attachments,
    }: {
      conversationId: string;
      data: CreateMessageDto;
      attachments?: File[];
    }) => communicationService.sendMessage(conversationId, data, attachments),
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.messages(conversationId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.conversations.all(),
      });
    },
  });
}

/**
 * Hook to mark messages as read
 */
export function useMarkMessagesAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) =>
      communicationService.markMessagesAsRead(conversationId),
    onSuccess: (_, conversationId) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.conversations.detail(conversationId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.notifications.unreadCount(),
      });
    },
  });
}

// ===== Notifications =====

/**
 * Hook to get notifications
 */
export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.communications.notifications.all(),
    queryFn: () => communicationService.getNotifications(),
    refetchInterval: 60000, // Poll every minute
  });
}

/**
 * Hook to get unread notification count
 */
export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: queryKeys.communications.notifications.unreadCount(),
    queryFn: () => communicationService.getUnreadCount(),
    refetchInterval: 30000, // Poll every 30 seconds
  });
}

/**
 * Hook to mark a notification as read
 */
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      communicationService.markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.notifications.all(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.notifications.unreadCount(),
      });
    },
  });
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => communicationService.markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.notifications.all(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.communications.notifications.unreadCount(),
      });
    },
  });
}
