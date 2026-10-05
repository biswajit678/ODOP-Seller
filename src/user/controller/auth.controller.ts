import {Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import {sendResponse, ValidationError, wrapAsync} from "../../util/handler.util";
import User from "../../model/userAuth.model";
import {generateToken} from "../../util/generateToken.util";

export const signup = wrapAsync(async (req: Request, res: Response) => {
    const {name, email, phone, password} = req.body;

    if(!name || !email || !phone) {
        throw new ValidationError("All fields are required");
    }

    if(password.length < 6){
        throw new ValidationError("Password Must be 6 character Atleast")
    }

    const user = await User.findOne({
        $or: [
            {email},
            {phone}
        ]
    });

    if(user) {
        throw new ValidationError(`User with email and phone already exists`);
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        phone,
        password: hashedPassword
    });

    const token = generateToken(newUser._id.toString(), "user")

    sendResponse(res, {
        status: 201,
        success: true,
        message: "User created Successfully",
        data: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            token
        }
    })
});

export const login = wrapAsync(async (req:Request, res:Response) => {
    const {phone, password} = req.body;

    if(!phone || !password) {
        throw new ValidationError("All fields are required");
    }

    const user = await User.findOne({phone});

    if(!user){
        throw new ValidationError("User not found")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        throw new ValidationError("Incorrect Password");
    }

    const token = generateToken(user._id.toString(), "user");

    sendResponse(res, {
        status:200,
        success:true,
        message:"Login successfull",
        data:{
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token
        }
    })
});

export const getProfile = wrapAsync(async (req: Request, res: Response) => {
    const userId = req.userId;

    const user = await User.findById(userId);

    sendResponse(res, {
        status:200,
        success:true,
        message:"Profile fetched Successfully",
        data:user
    });
});

export const updateProfile = wrapAsync(async (req:Request, res:Response) => {
    const userId = req.userId;
    const {name, profileImage} = req.body;

    const user = await User.findByIdAndUpdate(userId,{
        name,
        profileImage
    },{new:true});

    sendResponse(res, {
        status:200,
        success:true,
        message:"Profile updated Successfull",
        data:user
    })
});

export const deleteProfile = wrapAsync(async (req:Request, res:Response) => {
    const userId = req.userId;

    const user = await User.findByIdAndUpdate(userId, {
        isDeleted:true
    },{new:true});
    if(!user) {
        throw new ValidationError("User not found");
    }
    sendResponse(res, {
        status:200,
        success:true,
        message:"Profile Deleted Successfully",
        data:user
    });
});