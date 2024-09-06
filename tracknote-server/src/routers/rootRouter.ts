import { Router } from "express";
import authRouter from "routers/authRouter.ts";
import contentRouter from "routers/contentRouter.ts";

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/content', contentRouter);

export default rootRouter;