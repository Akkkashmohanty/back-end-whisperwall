import { Request, Response } from "express";
import * as service from "./like.service";
import { toggleLikeSchema } from "./like.validation";

export async function toggle(req: Request, res: Response) {
  const { postId } = toggleLikeSchema.parse(req.body);
  const { profileId } = (req as any).user;

  const result = await service.toggleLike(postId, profileId);
  res.json(result);
}

export async function status(req: Request, res: Response) {
  const postId = typeof req.params.postId === 'string' ? req.params.postId : req.params.postId[0];
  const { profileId } = (req as any).user;

  const result = await service.getLikeStatus(postId, profileId);
  res.json(result);
}