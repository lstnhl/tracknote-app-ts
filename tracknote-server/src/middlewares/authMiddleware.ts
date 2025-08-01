import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayloadWithRole extends jwt.JwtPayload {
    role?: string;
}

const authCheck = (requiredRole: string | null = null) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1];
        // const token = req.cookies['jwt'];
        if (!token) {
            return res.status(403).json({
                message: 'Доступ запрещён',
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.SALT) as JwtPayloadWithRole;

            if (requiredRole) {
                if (requiredRole === 'ADMIN' && decoded.role === 'USER') {
                    return res.status(403).json({
                        message: 'У вас недостаточно прав',
                    });
                }
            }

            req.userId = decoded.id;
            next();
        } catch (e) {
            return res.status(401).json({
                message: 'Токен недействителен',
            });
        }
    };
};

export default authCheck;
