import { Request } from "express";

declare module 'express' {
    interface Request {
        errorContext?: string;
        userId?: string;
    }
}