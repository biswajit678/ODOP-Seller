import {Request, Response, NextFunction} from "express";
import {wrapAsync, ValidationError, sendResponse} from "../../util/handler.util";
import User from "../../model/userAuth.model";

export const getAllUser = wrapAsync(async (req:Request, res:Response) => {
    const {page = 1, limit = 10} = req.query as any;

    const skip = (page - 1) * limit;

    const [user, total] = await Promise.all([
        User.find().limit(limit).skip(skip),

        User.countDocuments()
    ]);
    sendResponse(res, {
        status:200,
        success:true,
        message:"All User fetched successfully",
        data:{
            page,
            limit,
            total,
            totalPage:Math.ceil(total/limit),
            user,
        },
    });     
});

export const getUserById = wrapAsync(async (req:Request, res:Response) => {
    const {userId} = req.params;

    const user = await User.findById(userId);

    sendResponse(res, {
        status:200,
        success:true,
        message:'User fetched Successfully',
        data:user
    });
});

export const deleteUserId = wrapAsync(async (req: Request, res: Response) => {
    const {userId} = req.params;
    const {isDeleted} = req.body;

    const user = await User.findByIdAndUpdate(
        userId,
        { isDeleted},
        {new:true});

    sendResponse(res, {
        status:200,
        success:true,
        message:`User Deleted status is: ${isDeleted}`,
        data:user
    });
});

export const deactiveUserId = wrapAsync(async (req: Request, res: Response) => {
    const {userId} = req.params;
    const {isDeactivated} = req.body;

    const user = await User.findByIdAndUpdate(
        userId,
        {isDeactivated},
        {new: true}
    );
    sendResponse(res, {
        status:200,
        success:true,
        message:`User Deactivated status is: ${isDeactivated}`,
        data:user
    });
}); 