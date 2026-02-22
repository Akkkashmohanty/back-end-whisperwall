export interface CommentResponse {
  id: string;
  content: string;
  createdAt: Date;
  authorUsername: string;
  parentId?: string | null;

  
  likeCount: number;
}