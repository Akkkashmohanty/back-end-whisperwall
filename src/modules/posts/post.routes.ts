import { Router } from "express";
import * as controller from "./post.controller";
import { authMiddleware } from "@middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", controller.create);
router.get("/home", controller.home);
router.get("/for-you", controller.forYou);
router.get("/college/:college", controller.byCollege);

export default router;
