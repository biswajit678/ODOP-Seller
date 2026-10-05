import Router from "express";
import adminAuthRoute from "./auth.route";
import adminUserRoute from "./adminUser.route";

const router = Router();

router.use("/auth", adminAuthRoute);

router.use("/user", adminUserRoute);

export default router; 

