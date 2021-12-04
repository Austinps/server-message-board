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
} from '../controllers/votes.js';

import verifyUser from '../middleware/verifyUser.js';

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
router.put(
  '/comment/:id/down',
  verifyUser,
  userCommentDownVote,
  handleCommentDownVote
);

export default router;
