import Router from "express";
import upload from "../../middleware/multer.middleware";
import { adminAuth } from "../../middleware/admin.middleware";
import * as categoryController from "../controller/category.controller";

export const uploadSingle = upload.single("category");

const router = Router();

router.post("/", adminAuth, uploadSingle, categoryController.createCategory);

router.get("/", adminAuth, categoryController.getAllCategory);

router.get("/:categoryId", adminAuth, categoryController.categoryById);

router.delete("/", adminAuth, categoryController.deleteCategory);

router.put("/", adminAuth, categoryController.updateCategory);

export default router;