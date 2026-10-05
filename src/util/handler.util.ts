import { Request, Response, NextFunction} from "express";

const wrapAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
};

interface SendResponseOptions {
    status?: number;
    success?: boolean;
    message?: string;
    data?: any;
}

const sendResponse = (
    res: Response,
    {
    status = 200,
    success = true,
    message = " ",
    data = null
    } : SendResponseOptions
) => {
    return res.status(status).json({
        success,
        message,
        data
    });
};

class ValidationError extends Error {

    status: number;
    success: boolean;

    constructor(message: string, status: number = 400) {
        super(message);

        this.status = status;
        this.success = false; 

        Error.captureStackTrace(this, this.constructor);
    }
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const error = {
        status: err.status || 500,
        success: false,
        message: err.message || "Internal Server Error",
        data: null
    };

    return sendResponse(res, error);
};

export { wrapAsync, sendResponse, ValidationError, globalErrorHandler };