import jwt from "jsonwebtoken";

type Role = "admin" | "user";

const generateToken = (id: string, role: Role) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const expiresIn = process.env.JWT_EXPIRES || "7d";

    const token = jwt.sign(
        { 
            id,
            role
         },
        secret,
        {
            expiresIn: expiresIn as jwt.SignOptions["expiresIn"]
        }
    );

    return token;
};

export {generateToken};