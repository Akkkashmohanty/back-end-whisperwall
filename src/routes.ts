import { Router } from "express";
import authRoutes from "@modules/auth/auth.routes";
import adminRoutes from "@modules/admin/admin.routes";import postRoutes from "@modules/posts/post.routes";
import reportRoutes from "@modules/reports/report.routes";
import userRoutes from "@modules/users/user.routes";




const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/posts", postRoutes);
router.use("/reports", reportRoutes);
router.use("/users", userRoutes);
export default router;
