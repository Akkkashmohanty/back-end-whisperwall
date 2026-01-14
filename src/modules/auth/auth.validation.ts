import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "1 uppercase required")
    .regex(/[a-z]/, "1 lowercase required")
    .regex(/[0-9]/, "1 number required")
    .regex(/[^A-Za-z0-9]/, "1 special character required"),
  dob: z.coerce.date(),
  gender: z.enum(["MALE", "FEMALE"]),
  college: z.string().min(2),
  stream: z.string().min(2),
  username: z.string().min(3),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const forgotPasswordSchema = z.object({
  identifier: z.string(), // username or email
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});
