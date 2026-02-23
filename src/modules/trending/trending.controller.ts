import { Request, Response } from "express";
import * as service from "./trending.service";

export async function global(req: Request, res: Response) {
  const limit = Number(req.query.limit || 20);
  const window = String(req.query.window || "24h");

  const posts = await service.getGlobalTrending(
    limit,
    window
  );

  res.json(posts);
}

export async function college(req: Request, res: Response) {
  const college = Array.isArray(req.params.college) ? req.params.college[0] : req.params.college;

  const limit = Number(req.query.limit || 20);
  const window = String(req.query.window || "24h");

  const posts = await service.getCollegeTrending(
    college,
    limit,
    window
  );

  res.json(posts);
}