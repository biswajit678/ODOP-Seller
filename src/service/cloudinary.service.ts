import cloudinary from "../config/cloudinary.config";
import fs from "fs/promises";

export const uploadToCloudinary = async (
    filePath: string,
    folder: string,
) =>{
    try {
        return await cloudinary.uploader.upload(filePath, {
            folder
        });
    } finally {
        await fs.unlink(filePath).catch(() => {});
    }
};