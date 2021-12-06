import { Router } from 'express';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/post.js';
import verifyUser from '../middleware/authentication.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllPosts).post(verifyUser, createPost);

//single post
router
  .route('/:id')
  .get(getSinglePost)
  .patch(verifyUser, updatePost)
  .delete(verifyUser, deletePost);

export default router;
