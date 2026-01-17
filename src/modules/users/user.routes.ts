import { Router } from "express";
import * as controller from "./user.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/me", controller.me);
router.get("/me/posts", controller.myPosts);

export default router;
