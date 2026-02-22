import { Request, Response } from "express";
import * as service from "./commentLike.service";
import { toggleCommentLikeSchema } from "./commentLike.validation";

/* ============================
   TOGGLE
============================ */

export async function toggle(req: Request, res: Response) {
  const { commentId } = toggleCommentLikeSchema.parse(req.body);

  const { profileId } = (req as any).user;

  const result = await service.toggleCommentLike(commentId, profileId);

  res.json(result);
}

/* ============================
   STATUS
============================ */

export async function status(req: Request, res: Response) {
  const commentId = Array.isArray(req.params.commentId) ? req.params.commentId[0] : req.params.commentId;

  const { profileId } = (req as any).user;

  const result = await service.getCommentLikeStatus(commentId, profileId);

  res.json(result);
}