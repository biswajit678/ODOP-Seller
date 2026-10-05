import Router from "express";
import adminAuthRoute from "./auth.route";
import adminUserRoute from "./adminUser.route";
import bannerRoute from "./banner.routes";

const router = Router();

router.use("/auth", adminAuthRoute);

router.use("/user", adminUserRoute);

router.use("/banner", bannerRoute);

export default router; 

