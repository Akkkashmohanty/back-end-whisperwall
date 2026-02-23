import { Router } from "express";
import * as controller from "./trending.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/global", controller.global);
router.get("/college/:college", controller.college);

export default router;