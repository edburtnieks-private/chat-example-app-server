import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import createChatkitInstanceMiddleware from './middlewares/createChatkitInstanceMiddleware';

import indexRouter from './routes/index';
import chatkitRouter from './routes/chatkit';
import spotifyRouter from './routes/spotify';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api', indexRouter);
app.use('/api/chatkit', createChatkitInstanceMiddleware, chatkitRouter);
app.use('/api/spotify', spotifyRouter);

export default app;
