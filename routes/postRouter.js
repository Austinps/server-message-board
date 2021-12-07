import { Router } from 'express';
import {
    getPosts,
    getSinglePost,
    updatePost,
    deletePost
} from '../controllers/posts.js';
import verifyUser from '../middleware/authentication.js';

const router = Router();

router.get('/', getPosts);

router
    .route('/:id')
    .get(getSinglePost)
    .patch(verifyUser, updatePost)
    .delete(verifyUser, deletePost);

export default router;
