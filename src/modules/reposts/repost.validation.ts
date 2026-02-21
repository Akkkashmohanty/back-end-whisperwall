import { z } from "zod";

export const createRepostSchema = z.object({
  postId: z.string().uuid(),        // Original post
  content: z.string().min(1).max(300), // Quote text
});