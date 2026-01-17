import { Request, Response } from "express";
import { reportPostSchema } from "./report.validation";
import * as service from "./report.service";

export async function report(req: Request, res: Response) {
  const { postId, reason } = reportPostSchema.parse(req.body);
  const { profileId } = (req as any).user;

  await service.reportPost(postId, profileId, reason);
  res.json({ success: true });
}
