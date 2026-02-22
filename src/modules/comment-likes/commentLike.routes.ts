import { Router } from "express";
import * as controller from "./commentLike.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/toggle", controller.toggle);
router.get("/status/:commentId", controller.status);

export default router;