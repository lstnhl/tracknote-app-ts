import { Request, Response } from 'express';
import User from 'models/User.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({
                    message: 'Неверное имя пользователя или пароль',
                });
            }

            const isValidPass = await bcrypt.compare(
                password + process.env.SALT2,
                user.password
            );
            if (!isValidPass) {
                return res.status(401).json({
                    message: 'Неверное имя пользователя или пароль',
                });
            }

            const accessToken = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    avatar: user.avatar || '',
                    role: user.role,
                },
                process.env.SALT,
                {
                    expiresIn: '1h',
                }
            );

            const refreshToken = jwt.sign(
                {
                    username: user.username,
                },
                process.env.SALT2,
                {
                    expiresIn: '2d',
                }
            );

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24,
            });

            res.json({
                message: 'Вход успешен',
                accessToken,
            });
        } catch (e) {
            res.status(401).json({
                message: 'Ошибка входа',
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(
                password + process.env.SALT2,
                10
            );

            const user = await User.create({
                username,
                password: hashedPassword,
            });

            await user.save();

            res.status(201).json({
                message: 'Регистрация успешна',
                data: user._id,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Ошибка регистрации',
            });
        }
    }

    async logout(req: Request, res: Response) {
        const jwt = req.cookies['jwt'];

        if (!jwt) return res.status(204);

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.json({
            message: 'Вы вышли из системы',
        });
    }

    async refresh(req: Request, res: Response) {
        const token = req.cookies['jwt'];

        if (!token)
            return res.status(401).json({
                message: 'Вы не вошли в систему',
            });

        jwt.verify(
            token,
            process.env.SALT2,
            async (err: any, decoded: any) => {
                if (err) return res.status(403);

                const user = await User.findOne({ username: decoded.username });

                if (!user) return res.status(401);

                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        username: user.username,
                        avatar: user.avatar || '',
                        role: user.role,
                    },
                    process.env.SALT,
                    {
                        expiresIn: '1h',
                    }
                );

                res.json({ accessToken });
            }
        );
    }
}

export default new AuthController();
