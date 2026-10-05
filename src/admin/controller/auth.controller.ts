import {wrapAsync, ValidationError, sendResponse} from "../../util/handler.util"
import {Request, Response, NextFunction} from "express"
import bcrypt from "bcrypt";
import Admin from "../../model/adminAuth.model";
import {generateToken} from "../../util/generateToken.util";

export const signup = wrapAsync(async (req: Request, res: Response) => {
  const {name, email, password} = req.body;

  if(!email || !password){
    throw new ValidationError("All fields are required");
  }

  if (password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters");
  }

  const admin = await Admin.findOne({email});

  if(admin){ 
    throw new ValidationError("Admin already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    name,
    email,
    password: hashedPassword
  });

const token = generateToken(newAdmin._id.toString(), 'admin');

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Admin created Successfully",
    data: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        token
    }
  })

});

export const login = wrapAsync (async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new ValidationError("All fields are required");
    }

    const admin = await Admin.findOne({email});

    if(!admin){
        throw new ValidationError("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if(!isPasswordValid){
        throw new ValidationError("Incorrect Password");
    }

    const token = generateToken(admin._id.toString(), 'admin');

    sendResponse(res, {
        status:200,
        success:true,
        message: "Login Successfull",
        data: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            token
        }
    });
});

export const getProfile = wrapAsync(async (req: Request, res: Response) => {
    const adminId = req.adminId;

    const admin = await Admin.findById(adminId);

    sendResponse(res, {
        status: 200,
        success: true,
        message: "Admin Profile",
        data: admin
    });
});

 