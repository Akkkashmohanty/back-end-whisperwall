export interface NotificationResponse {
  id: string;
  type: string;

  message: string;

  postId?: string | null;
  commentId?: string | null;

  isRead: boolean;
  createdAt: Date;
}