import Router from "express";
import * as adminAuthController from "../controller/auth.controller"
import { userAuth } from "../../middleware/user.middleware";

const router = Router();

router.post("/signup", adminAuthController.signup);

router.post("/login", adminAuthController.login);

router.get("/", userAuth, adminAuthController.getProfile);

router.patch("/profile", userAuth, adminAuthController.updateProfile);

router.put("/profile/delete", userAuth, adminAuthController.deleteProfile);

export default router;