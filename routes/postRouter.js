import { Router } from 'express';
import {
  getAllPosts,
  getSinglePost,
  deleteSinglePost,
  updateSinglePost,
} from '../controllers/posts.js';
import verifyUser from '../middleware/authentication.js';

const router = Router();

router.get('/', getAllPosts);

//single post
router
  .route('/:id')
  .get(getSinglePost)
  .patch(verifyUser, updateSinglePost)
  .delete(verifyUser, deleteSinglePost);

export default router;
