import { Router } from 'express';
import {
  getUsers,
  getSingleUser,
  updateUser,
  getUserSubscriptions,
} from '../controllers/users.js';
import { getPostsByUser } from '../controllers/posts.js';
import { getCommentsByUser } from '../controllers/comments.js';

import verifyUser from '../middleware/authentication.js';

const router = Router();

router.get('/', getUsers);

router.route('/:id').get(getSingleUser).patch(verifyUser, updateUser);

router.get('/:id/subreddits', getUserSubscriptions);
router.get('/:id/posts', getPostsByUser);
router.get('/:id/comments', getCommentsByUser);

export default router;
