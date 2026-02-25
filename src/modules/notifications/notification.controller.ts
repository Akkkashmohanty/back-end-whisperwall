import { Request, Response } from "express";
import * as service from "./notification.service";

/* ============================
   GET LIST
============================ */

export async function list(req: Request, res: Response) {
  const { userId } = (req as any).user;

  const limit = Number(req.query.limit || 30);

  const items = await service.getMyNotifications(
    userId,
    limit
  );

  res.json(items);
}

/* ============================
   MARK ONE
============================ */

export async function read(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { userId } = (req as any).user;

  await service.markAsRead(id, userId);

  res.json({ success: true });
}

/* ============================
   MARK ALL
============================ */

export async function readAll(req: Request, res: Response) {
  const { userId } = (req as any).user;

  await service.markAllRead(userId);

  res.json({ success: true });
}

/* ============================
   UNREAD COUNT
============================ */

export async function unreadCount(
  req: Request,
  res: Response
) {
  const { userId } = (req as any).user;

  const count = await service.getUnreadCount(userId);

  res.json({ count });
}