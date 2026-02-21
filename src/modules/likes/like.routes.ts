import { Router } from "express";
import * as controller from "./like.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/toggle", controller.toggle);
router.get("/status/:postId", controller.status);

export default router;