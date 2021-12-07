import { Router } from 'express';
import {
    getAllSubreddits,
    getSingleSubreddit,
    createSubreddit,
    handleSubredditMembers,
    updateSubreddit
} from '../controllers/subreddits.js';
import {
    createSinglePost,
    getAllPostsFromSubreddit
} from '../controllers/posts.js';
import { handleUserSubscription } from '../controllers/users.js';
import verifyUser from '../middleware/authentication.js';

const router = Router();

router.route('/').get(getAllSubreddits).post(verifyUser, createSubreddit);

router
    .route('/:id')
    .get(getSingleSubreddit)
    .post(verifyUser, createSinglePost)
    .patch(verifyUser, updateSubreddit);

router.get('/:id/posts', getAllPostsFromSubreddit);
router.patch(
    '/:id/subscribe',
    verifyUser,
    handleUserSubscription,
    handleSubredditMembers
);

export default router;
