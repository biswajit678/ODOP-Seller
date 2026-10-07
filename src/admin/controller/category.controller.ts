import { Request, Response } from "express";
import { sendResponse, ValidationError, wrapAsync } from "../../util/handler.util";
import { uploadToCloudinary } from "../../service/cloudinary.service";
import Category from "../../model/category.model";

export const createCategory = wrapAsync (async (req: Request, res: Response) => {
    const {name, title} = req.body;

    if(!name || !title){
        throw new ValidationError("All fields are Required");
    }

    if(!req.file){
        throw new ValidationError("Image is Required");
    }

    const result = await uploadToCloudinary(
        req.file.path,
        "category"
    );

    const category = await Category.create({
        name,
        title,
        image:result.secure_url
    });

    sendResponse(res, {
        status:201,
        success:true,
        message:"Category created",
        data:category
    });
});

export const getAllCategory = wrapAsync (async (req: Request, res: Response) => {
    const {page = 1, limit = 10, status} = req.query as any;

    const skip = (page - 1) * limit;

    const [category, total] = await Promise.all([
        Category.find().limit(limit).skip(skip),

        Category.countDocuments()
    ]);

    sendResponse(res, {
        status:200,
        success:true,
        message:"Category fetched successfully",
        data:{
            page,
            limit,
            total,
            totalPage:Math.ceil(total/limit),
            category
        },
    });
});

export const categoryById = wrapAsync (async (req: Request, res: Response) => {
    const {categoryId} = req.params;
    
    const category = await Category.findById(categoryId);

    sendResponse(res, {
        status:200,
        success:true,
        message:"Category fetched successfully",
        data:category
    });
});

export const deleteCategory = wrapAsync (async (req: Request, res: Response) => {
     const {categoryId} = req.body;

     const category = await Category.findByIdAndDelete(categoryId, {
        new:true
     });

     sendResponse(res, {
        status:200,
        success:true,
        message:"Category deleted",
        data:category
     });
});

export const updateCategory = wrapAsync (async (req: Request, res: Response) => {
    const {categoryId, name, title} = req.body;

    let image;

    if(req.file){
        const result = await uploadToCloudinary(
            req.file.path,
            "category"
        );
        image = result.secure_url;
    }

    const category = await Category.findByIdAndUpdate(
        categoryId,
        {
            name,
            title,
            ...(image && { image })
        },
        {new:true}
    );
    sendResponse(res, {
        status:200,
        success:true,
        message:"Category updated successfully",
        data:category
    })
})