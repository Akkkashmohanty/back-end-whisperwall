import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1).max(300),
  parentId: z.string().uuid().optional(),
});

export const getCommentsQuerySchema = z.object({
  limit: z.coerce.number().min(5).max(50).default(20),
  cursor: z.string().optional(),
});

export const reportCommentSchema = z.object({
  commentId: z.string().uuid(),
  reason: z.string().min(3).max(200),
});