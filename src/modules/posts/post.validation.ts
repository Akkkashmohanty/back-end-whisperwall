import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1).max(500),
});

export const feedQuerySchema = z.object({
  limit: z.coerce.number().min(5).max(50).default(20),
});

export const collegeParamSchema = z.object({
  college: z.string(),
});
