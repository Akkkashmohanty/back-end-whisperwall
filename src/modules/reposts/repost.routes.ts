import { Router } from "express";
import * as controller from "./repost.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", controller.create);

export default router;