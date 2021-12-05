import { Router } from 'express';

import {
  userPostUpVote,
  userPostDownVote,
  userCommentUpVote,
  userCommentDownVote,
  handleCommentUpVote,
  handleCommentDownVote,
  handlePostUpVote,
  handlePostDownVote,
} from '../controllers/vote.js';

import verifyUser from '../middleware/authentication.js';

const router = Router({ mergeParams: true });

router.patch('/post/:id/up', verifyUser, userPostUpVote, handlePostUpVote);
router.patch(
  '/post/:id/down',
  verifyUser,
  userPostDownVote,
  handlePostDownVote
);

router.patch(
  '/comment/:id/up',
  verifyUser,
  userCommentUpVote,
  handleCommentUpVote
);
router.patch(
  '/comment/:id/down',
  verifyUser,
  userCommentDownVote,
  handleCommentDownVote
);

export default router;
