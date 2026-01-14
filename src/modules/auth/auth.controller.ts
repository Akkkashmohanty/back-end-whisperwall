import { Request, Response } from "express";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.validation";
import * as service from "./auth.service";

export async function signup(req: Request, res: Response) {
  try {
    const data = signupSchema.parse(req.body);
    const idCardUrl = (req as any).file?.path;
    const result = await service.signup(data, idCardUrl);
    res.status(201).json(result);

  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const result = await service.login(username, password);
    res.json(result);
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { identifier } = forgotPasswordSchema.parse(req.body);
    await service.requestPasswordReset(identifier);
    res.json({ message: "Request submitted for review" });
  } catch {
    res.json({ message: "Request submitted for review" });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token, newPassword } = resetPasswordSchema.parse(req.body);
    await service.resetPassword(token, newPassword);
    res.json({ message: "Password updated" });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
