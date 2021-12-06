import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { handleErrors, throw404 } from './middleware/errors.js';

import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import subredditRouter from './routes/subredditRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import searchRouter from './routes/searchRouter.js';
import voteRouter from './routes/voteRouter.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); 

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subreddits', subredditRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/posts/:id/comments', commentRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/votes', voteRouter);

app.use(throw404);
app.use(handleErrors);

export default app;
