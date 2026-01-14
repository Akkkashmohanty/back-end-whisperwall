import { z } from "zod";

export const approveUserSchema = z.object({
  userId: z.string().uuid(),
});

export const rejectUserSchema = z.object({
  userId: z.string().uuid(),
  reason: z.string().min(3),
});

export const approveResetSchema = z.object({
  requestId: z.string().uuid(),
});
