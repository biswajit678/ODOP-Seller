import Router from "express";
import * as adminUserController from "../controller/adminUser.controller";
import {adminAuth} from "../../middleware/admin.middleware";

const router = Router();

router.get("/", adminAuth, adminUserController.getAllUser);

router.get("/:userId", adminAuth, adminUserController.getUserById);

router.put("/delete/:userId", adminAuth, adminUserController.deleteUserId);

router.put("/deactive/:userId", adminAuth, adminUserController.deactiveUserId);

export default router;