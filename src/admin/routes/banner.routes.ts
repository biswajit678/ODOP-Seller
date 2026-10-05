import Router from "express";
import { adminAuth } from "../../middleware/admin.middleware";
import * as bannerController from "../controller/banner.controller";

const router = Router();

router.post("/", adminAuth, bannerController.createBanner);

router.get("/:id", adminAuth, bannerController.getBannerById);

router.get("/", adminAuth, bannerController.getAllBanner);

router.delete("/", adminAuth, bannerController.deleteBanner);

router.put("/", adminAuth, bannerController.editBanner);

export default router;