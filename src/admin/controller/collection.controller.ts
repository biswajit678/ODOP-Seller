import { Request, Response } from "express";
import { sendResponse, ValidationError, wrapAsync } from "../../util/handler.util";
import { uploadToCloudinary } from "../../service/cloudinary.service";
import Collection from "../../model/collection.model";

export const createCollection = wrapAsync (async (req: Request, res: Response) => {
    const {name, description} = req.body;

    if(!name || !description){
        throw new ValidationError("All Fields are Required");
    }

    if(!req.file){
        throw new ValidationError("Image is Required");
    }

    const result = await uploadToCloudinary(
        req.file.path,
        "collection"
    );

    const collection = await Collection.create({
        name,
        description,
        image:result.secure_url
    });

    sendResponse(res, {
        status:201,
        success:true,
        message:"Collection created",
        data:collection
    });
});

export const getAllCollection = wrapAsync (async (req: Request, res: Response) => {
    const collection = await Collection.find();

    sendResponse(res, {
        status:200,
        success:true,
        message:"Collection fetched Successfully",
        data:collection
    });
});

export const getCollectionById = wrapAsync (async (req: Request, res: Response) => {
    const {id} = req.params;

    const collection = await Collection.findById(id);

    sendResponse(res, {
        status:200,
        success:true,
        message:`${collection?.name} fetched successfully`,
    });
});

export const updateCollection = wrapAsync (async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, description} = req.body;

    let image;

    if(req.file){
        const result = await uploadToCloudinary(
            req.file.path,
            "collection"
        );
        image = result.secure_url;
    }

    const collection = await Collection.findByIdAndUpdate(id, {
        name,
        description,
        ...(image && {image})
    },{new:true});

    sendResponse(res, {
        status:200,
        success:true,
        message:"Collection updated Successfully",
        data:collection
    });
});
 