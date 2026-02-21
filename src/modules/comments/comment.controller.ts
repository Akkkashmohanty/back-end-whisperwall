import { Request, Response } from "express";
import * as service from "./comment.service";
import {
  createCommentSchema,
  getCommentsQuerySchema,
  reportCommentSchema,
} from "./comment.validation";

export async function create(req: Request, res: Response) {
  const { postId, content, parentId } = createCommentSchema.parse(req.body);
  const { profileId } = (req as any).user;

  const comment = await service.createComment(
    profileId,
    postId,
    content,
    parentId
  );

  res.status(201).json(comment);
}

export async function getByPost(req: Request, res: Response) {
  const { limit, cursor } = getCommentsQuerySchema.parse(req.query);
  const postId = Array.isArray(req.params.postId) ? req.params.postId[0] : req.params.postId;

  const comments = await service.getCommentsForPost(postId, limit, cursor);
  res.json(comments);
}

export async function report(req: Request, res: Response) {
  const { commentId, reason } = reportCommentSchema.parse(req.body);
  const { profileId } = (req as any).user;

  await service.reportComment(commentId, profileId, reason);
  res.json({ success: true });
}