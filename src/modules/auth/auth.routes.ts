import { Router } from "express";
import multer from "multer";
import * as c from "./auth.controller";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/signup", upload.single("idCardImage"), c.signup);
router.post("/login", c.login);
router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password", c.resetPassword);

export default router;
