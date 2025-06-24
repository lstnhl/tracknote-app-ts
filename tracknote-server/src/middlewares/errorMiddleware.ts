import { Request, Response, NextFunction } from 'express';

interface RequestWithContext extends Request {
    errorContext?: string;
}

const errorMiddleware = (err: any, req: RequestWithContext, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.customMessage || req.errorContext || 'Произошла ошибка на сервере';
    res.status(statusCode).json({
        message,
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
};

export default errorMiddleware;
