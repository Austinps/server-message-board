import { Router } from 'express';

import {
  getCommentsFromPost,
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/comment.js';
import verifyUser from '../middleware/authentication.js';
import { pushCommentToPost } from '../controllers/post.js';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(getCommentsFromPost)
  .post(verifyUser, createComment, pushCommentToPost);

router
  .route('/:commentId')
  .patch(verifyUser, updateComment)
  .delete(verifyUser, deleteComment);

export default router;
