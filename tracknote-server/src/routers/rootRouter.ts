import { Router } from "express";
import authRouter from "routers/authRouter.ts";
import contentRouter from "routers/contentRouter.ts";
import noteRouter from "routers/noteRouter.ts";
import errorMiddleware from "middlewares/errorMiddleware.ts";

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/content', contentRouter);
rootRouter.use('/notes', noteRouter);
rootRouter.use(errorMiddleware);

export default rootRouter;
