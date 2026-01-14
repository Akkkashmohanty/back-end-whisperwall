import { Router } from "express";
import * as c from "./admin.controller";
import { adminAuth } from "@middleware/admin.middleware";

const router = Router();

router.use(adminAuth);

router.get("/pending-users", c.pendingUsers);
router.post("/approve-user", c.approveUser);
router.post("/reject-user", c.rejectUser);
router.get("/password-reset-requests", c.resetRequests);
router.post("/approve-password-reset", c.approveReset);

export default router;
