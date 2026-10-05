import app from "./app";
import { connectDB } from "./config/db.config";
import adminRoute from "./admin/routes/adminRoute"
import userRoute from "./user/routes/userRoutes";
import { globalErrorHandler } from "./util/handler.util";

connectDB(); 

const PORT = process.env.PORT || 3000;

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});