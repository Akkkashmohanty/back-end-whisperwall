import { Request, Response } from "express";
import * as service from "./admin.service";
import { approveUserSchema, rejectUserSchema, approveResetSchema } from "./admin.validation";

export async function pendingUsers(req: Request, res: Response) {
  const users = await service.getPendingUsers();
  res.json(users);
}

export async function approveUser(req: Request, res: Response) {
  const { userId } = approveUserSchema.parse(req.body);
  await service.approveUser(userId, (req as any).admin.id);
  res.json({ success: true });
}

export async function rejectUser(req: Request, res: Response) {
  const { userId } = rejectUserSchema.parse(req.body);
  await service.rejectUser(userId, (req as any).admin.id);
  res.json({ success: true });
}

export async function resetRequests(req: Request, res: Response) {
  const data = await service.getResetRequests();
  res.json(data);
}

export async function approveReset(req: Request, res: Response) {
  const { requestId } = approveResetSchema.parse(req.body);
  await service.approveReset(requestId);
  res.json({ success: true });
}
