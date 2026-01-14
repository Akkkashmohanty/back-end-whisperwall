import { Router } from "express";
import authRoutes from "@modules/auth/auth.routes";
import adminRoutes from "@modules/admin/admin.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
