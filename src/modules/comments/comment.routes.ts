import { Router } from "express";
import * as controller from "./comment.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", controller.create);
router.get("/post/:postId", controller.getByPost);
router.post("/report", controller.report);

export default router;