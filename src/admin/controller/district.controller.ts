import District from "../../model/district.model";
import { uploadToCloudinary } from "../../service/cloudinary.service";
import { sendResponse, ValidationError, wrapAsync } from "../../util/handler.util";
import { Request, Response } from "express";

export const createDistrict = wrapAsync (async (req: Request, res: Response) => {
    const {name, title} = req.body;

    if(!name || !title){
        throw new ValidationError("All fields are Required");
    }

    if(!req.file){
        throw new ValidationError("Image is Required");
    }

    const result = await uploadToCloudinary(
        req.file.path,
        "district"
    );

    const district = await District.create({
        name,
        title,
        image: result.secure_url
    });

    sendResponse(res, {
        status:201,
        success:true,
        message:"District created successfully",
        data:district
    });
});

export const getAllDistrict = wrapAsync (async (req: Request, res: Response) => {
    const district = await District.find();

    sendResponse(res, {
        status:200,
        success:true,
        message:"All district fetched successfully",
        data:district
    });
});