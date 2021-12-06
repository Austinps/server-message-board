import { Router } from 'express';

import verifyUser from '../middleware/authentication.js';
import {
  handleUserPostVote,
  handleUserCommentVote,
} from '../controllers/user.js';
import { handlePostVoteTotals } from '../controllers/post.js';
import { handleCommentVoteTotals } from '../controllers/comment.js';

const router = Router({ mergeParams: true });

router.patch(
  '/post/:id/vote',
  verifyUser,
  handleUserPostVote,
  handlePostVoteTotals
);

router.patch(
  '/comment/:id/vote',
  verifyUser,
  handleUserCommentVote,
  handleCommentVoteTotals
);

export default router;
