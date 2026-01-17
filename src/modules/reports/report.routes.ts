import { Router } from "express";
import * as controller from "./report.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.post("/", controller.report);

export default router;
