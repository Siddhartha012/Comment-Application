export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  comment: {
    content: string;
  };
}
