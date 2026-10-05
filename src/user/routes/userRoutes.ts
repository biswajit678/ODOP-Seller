import Router from "express";
import adminAuthRoute from "./auth.routes";

const router = Router();

router.use("/auth", adminAuthRoute);

export default router;