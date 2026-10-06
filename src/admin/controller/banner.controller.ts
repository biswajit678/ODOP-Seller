import { Request, Response } from "express";
import { sendResponse, ValidationError, wrapAsync } from "../../util/handler.util";
import { uploadToCloudinary } from "../../service/cloudinary.service";
import Banner from "../../model/banner.model";

export const createBanner = wrapAsync (async (req: Request, res: Response) => {
    const {title, type, buttonLink} = req.body;

    if(!req.file){
        throw new ValidationError("Image is Required");
    }

    const result = await uploadToCloudinary(
        req.file.path,
        "banner",
    );

    const banner = await Banner.create({
        title,
        type,
        buttonLink,
        image: result.secure_url
    });
    sendResponse(res, {
        status:201,
        success:true,
        message:"New Banner is Created",
        data:banner
    });
});

export const getAllBanner = wrapAsync (async (req: Request, res: Response) => {
    const {page = 1, limit = 10, type} = req.query as any;

    const skip = (page - 1) * limit;

    const query: any = {};

    if(type){
        query.type = type;
    }

    const [banner, total] = await Promise.all([
        Banner.find(query).skip(skip).limit(limit),

        Banner.countDocuments(query)
    ]);
    sendResponse(res, {
        status:200,
        success:true,
        message:"Banner fetched successfully",
        data:{
            page,
            limit,
            total,
            totalPage: Math.ceil(total/limit),
            banner
        },
    });
});

export const getBannerById = wrapAsync (async (req: Request, res: Response) => {
    const {bannerId} = req.params;

    const banner = await Banner.findById(bannerId);

    sendResponse(res, {
        status:200,
        success:true,
        message:"Banner fetched successfully",
        data:banner
    });
});

export const deleteBanner = wrapAsync (async (req: Request, res: Response) => {
    const {bannerId} = req.body;

    const banner = await Banner.findByIdAndDelete(bannerId, {new: true});

    sendResponse(res, {
        status:200,
        success:true,
        message:"Banner deleted Successfully",
        data:banner
    });
});

export const editBanner = wrapAsync(async (req: Request, res: Response) => {
    const { bannerId, title, type, buttonLink } = req.body;

    let image;

    if (req.file) {
        const result = await uploadToCloudinary(
            req.file.path,
            "banner"
        );

        image = result.secure_url;
    }

    const banner = await Banner.findByIdAndUpdate(
        bannerId,
        {
            title,
            type,
            buttonLink,
            ...(image && { image })
        },
        { new: true }
    );

    sendResponse(res, {
        status: 200,
        success: true,
        message: "Banner updated successfully",
        data: banner
    });
});