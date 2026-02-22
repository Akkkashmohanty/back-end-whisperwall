import { z } from "zod";

export const toggleCommentLikeSchema = z.object({
  commentId: z.string().uuid(),
});