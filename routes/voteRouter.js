import { Router } from 'express';

import verifyUser from '../middleware/authentication.js';
import {
    handleUserVoteForPost,
    handleUserVoteForComment
} from '../controllers/users.js';
import { handleVoteForSinglePost } from '../controllers/posts.js';
import { handleVoteForSingleComment } from '../controllers/comments.js';

const router = Router();

router.patch(
    '/post/:id',
    verifyUser,
    handleUserVoteForPost,
    handleVoteForSinglePost
);

router.patch(
    '/comment/:id',
    verifyUser,
    handleUserVoteForComment,
    handleVoteForSingleComment
);

export default router;
