import Router from "express";
import adminAuthRoute from "./auth.route";
import adminUserRoute from "./adminUser.route";
import bannerRoute from "./banner.routes";
import categoryRoute from "./category.route";
import districtRoute from "./district.route"; 
import productRoute from "./product.route";

const router = Router();

router.use("/auth", adminAuthRoute);

router.use("/user", adminUserRoute);

router.use("/banner", bannerRoute);

router.use("/category", categoryRoute);

router.use("/district", districtRoute);

router.use("/product", productRoute);

export default router; 

