import Router from "express";
import * as adminAuthController from "../controller/auth.controller";
import {adminAuth} from "../../middleware/admin.middleware";

const router = Router();

router.post("/signup", adminAuthController.signup);

router.post("/login", adminAuthController.login);

router.get("/", adminAuth, adminAuthController.getProfile);

export default router;
