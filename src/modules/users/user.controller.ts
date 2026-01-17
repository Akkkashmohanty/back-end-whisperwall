import { Request, Response } from "express";
import * as service from "./user.service";

export async function me(req: Request, res: Response) {
  const { userId } = (req as any).user;

  const profile = await service.getMyProfile(userId);
  res.json(profile);
}

export async function myPosts(req: Request, res: Response) {
  const { profileId } = (req as any).user;

  const posts = await service.getMyPosts(profileId);
  res.json(posts);
}
