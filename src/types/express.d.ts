declare global {
    namespace Express {
        interface Request {
            adminId?: string;
            userId?: string;
        }
    }
}

export {};