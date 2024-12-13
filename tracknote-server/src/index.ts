import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import rootRouter from 'routers/rootRouter.ts';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_ORIGIN,
    })
);
app.use(cookieParser());
app.use('/api/static', express.static('_storage'));
app.use('/api', rootRouter);

app.listen(PORT, async () => {
    if (process.env.MONGO_URI) {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Соединение с MongoDB установлено');
    }
    console.log(`Сервер запущен на порту ${PORT}`);
});
