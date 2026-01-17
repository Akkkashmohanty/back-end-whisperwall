import { z } from "zod";

export const reportPostSchema = z.object({
  postId: z.string().uuid(),
  reason: z.string().min(3).max(200),
});
