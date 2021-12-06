import { Router } from 'express';
import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  getUserSubscriptions,
} from '../controllers/users.js';
import { getAllPostsByUser } from '../controllers/posts.js';
import { getAllCommentsByUser } from '../controllers/comments.js';

import verifyUser from '../middleware/authentication.js';

const router = Router();

router.get('/', getAllUsers);

router.route('/:id').get(getSingleUser).patch(verifyUser, updateSingleUser);

router.get('/:id/subreddits', getUserSubscriptions);
router.get('/:id/posts', getAllPostsByUser);
router.get('/:id/comments', getAllCommentsByUser);

export default router;
