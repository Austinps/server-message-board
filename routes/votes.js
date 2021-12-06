import { Router } from 'express';

import verifyUser from '../middleware/authentication.js';
import {
  handleUserVoteForPost,
  handleUserVoteForComment,
} from '../controllers/user.js';
import { handleVoteForSinglePost } from '../controllers/post.js';
import { handleVoteForSingleComment } from '../controllers/comment.js';

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
