import { Request, Response } from "express";
import * as service from "./repost.service";
import { createRepostSchema } from "./repost.validation";

export async function create(req: Request, res: Response) {
  const { postId, content } = createRepostSchema.parse(req.body);

  const { profileId, college } = (req as any).user;

  const repost = await service.createRepost(
    profileId,
    postId,
    content,
    college
  );

  res.status(201).json(repost);
}