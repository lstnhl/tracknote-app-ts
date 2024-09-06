import { Router } from 'express';
import authController from 'controllers/authController.ts';
import authCheck from 'middlewares/authMiddleware.ts';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);

export default authRouter;
