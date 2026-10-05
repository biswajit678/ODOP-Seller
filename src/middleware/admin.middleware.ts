import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
    role: string
}

export const adminAuth = (
    req: Request, res: Response, next: NextFunction
) => {
    try {
        const header = req.headers.authorization;

        if(!header || !header.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Authentication Token Required",
            });
        };

        const token = header.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        if(decoded.role !== "admin"){
            return res.status(401).json({   
                success:false,
                message:"You are not Authorized for this Access"
            })
        }

        req.adminId = decoded.id;

        next();
    }catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        })
    }
}