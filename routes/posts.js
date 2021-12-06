import { Router } from 'express';
import {
  getAllPosts,
  getSinglePost,
  createSinglePost,
  deleteSinglePost,
  updateSinglePost,
} from '../controllers/post.js';
import verifyUser from '../middleware/authentication.js';

const router = Router();

router.route('/').get(getAllPosts).post(verifyUser, createSinglePost);

//single post
router
  .route('/:id')
  .get(getSinglePost)
  .patch(verifyUser, updateSinglePost)
  .delete(verifyUser, deleteSinglePost);

export default router;
