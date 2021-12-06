import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  getUserSubscriptions,
} from '../controllers/user.js';
import { getAllPostsByUser } from '../controllers/post.js';
import { getAllCommentsByUser } from '../controllers/comment.js';

import verifyUser from '../middleware/authentication.js';

const router = Router();

router.get('/', getAllUsers);

router.route('/:id').get(getSingleUser).patch(verifyUser, updateSingleUser);

router.get('/:id/subreddits', getUserSubscriptions);
router.get('/:id/posts', getAllPostsByUser);
router.get('/:id/comments', getAllCommentsByUser);

export default router;
