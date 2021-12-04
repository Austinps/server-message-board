import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  getUserSubs,
  getUserPosts,
  getUserComments,
} from '../controllers/user.js';

import verifyUser from '../middleware/verifyUser.js';

const router = Router({ mergeParams: true });

router.get('/', getAllUsers);

router.route('/:id').get(getSingleUser).patch(verifyUser, updateSingleUser);

router.get('/:id/subreddits', getUserSubs);
router.get('/:id/posts', getUserPosts);
router.get('/:id/comments', getUserComments);

export default router;
