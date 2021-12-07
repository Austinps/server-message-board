import { Router } from 'express';
import {
    getSubreddits,
    getSingleSubreddit,
    createSubreddit,
    handleSubredditMembership,
    updateSubreddit
} from '../controllers/subreddits.js';
import { createPost, getPostsFromSubreddit } from '../controllers/posts.js';
import { handleUserSubscription } from '../controllers/users.js';
import verifyUser from '../middleware/authentication.js';

const router = Router();

router.route('/').get(getSubreddits).post(verifyUser, createSubreddit);

router
    .route('/:id')
    .get(getSingleSubreddit)
    .post(verifyUser, createPost)
    .patch(verifyUser, updateSubreddit);

router.get('/:id/posts', getPostsFromSubreddit);
router.patch(
    '/:id/subscribe',
    verifyUser,
    handleUserSubscription,
    handleSubredditMembership
);

export default router;
