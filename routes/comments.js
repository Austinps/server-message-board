import { Router } from 'express';

import {
  getAllCommentsFromPost,
  createComment,
  deleteComment,
  editComment,
} from '../controllers/comments.js';
import verifyUser from '../middleware/authentication.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllCommentsFromPost).post(verifyUser, createComment);

router
  .route('/:commentId')
  .patch(verifyUser, editComment)
  .delete(verifyUser, deleteComment);

export default router;
