import { Router } from "express";
import * as controller from "./notification.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", controller.list);
router.get("/unread-count", controller.unreadCount);

router.patch("/:id/read", controller.read);
router.patch("/read-all", controller.readAll);

export default router;