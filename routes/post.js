import { Router } from 'express';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  editPost,
} from '../controllers/posts.js';
import verifyUser from '../middleware/verifyUser.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllPosts).post(verifyUser, createPost);

//single post
router
  .route('/:id')
  .get(getSinglePost)
  .patch(verifyUser, editPost)
  .delete(verifyUser, deletePost);

export default router;
