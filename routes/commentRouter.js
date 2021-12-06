import { Router } from 'express';

import {
  getAllCommentsFromPost,
  createSingleComment,
  deleteSingleComment,
  updateSingleComment,
} from '../controllers/comments.js';
import verifyUser from '../middleware/authentication.js';
import { pushCommentIdToPost } from '../controllers/posts.js';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(getAllCommentsFromPost)
  .post(verifyUser, createSingleComment, pushCommentIdToPost);

router
  .route('/:commentId')
  .patch(verifyUser, updateSingleComment)
  .delete(verifyUser, deleteSingleComment);

export default router;
