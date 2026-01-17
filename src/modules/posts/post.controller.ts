import { Request, Response } from "express";
import * as service from "./post.service";
import {
  createPostSchema,
  feedQuerySchema,
  collegeParamSchema,
} from "./post.validation";

export async function create(req: Request, res: Response) {
  const { content } = createPostSchema.parse(req.body);
  const { profileId, college } = (req as any).user;

  const post = await service.createPost(profileId, college, content);
  res.status(201).json(post);
}

export async function home(req: Request, res: Response) {
  const { limit } = feedQuerySchema.parse(req.query);
  const { college } = (req as any).user;

  res.json(await service.getHomeFeed(college, limit));
}

export async function forYou(req: Request, res: Response) {
  const { limit } = feedQuerySchema.parse(req.query);

  res.json(await service.getForYouFeed(limit));
}

export async function byCollege(req: Request, res: Response) {
  const { limit } = feedQuerySchema.parse(req.query);
  const { college } = collegeParamSchema.parse(req.params);

  res.json(await service.getCollegeFeed(college, limit));
}
