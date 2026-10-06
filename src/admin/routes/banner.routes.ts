import Router from "express";
import { adminAuth } from "../../middleware/admin.middleware";
import * as bannerController from "../controller/banner.controller";
import upload from "../../middleware/multer.middleware";

const router = Router();

export const uploadSingle = upload.single("image");

router.post("/", adminAuth, uploadSingle, bannerController.createBanner);

router.get("/:bannerId", adminAuth, bannerController.getBannerById);

router.get("/", adminAuth, bannerController.getAllBanner);

router.delete("/", adminAuth, bannerController.deleteBanner);

router.put("/", adminAuth, uploadSingle, bannerController.editBanner);

export default router;