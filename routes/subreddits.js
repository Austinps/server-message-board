import { Router } from 'express';
import {
  getAllSubs,
  getSingleSubreddit,
  createSubreddit,
  handleSubredditMembers,
  updateSubreddit,
} from '../controllers/subreddit.js';
import { getPostsFromSubreddit } from '../controllers/post.js';
import { handleUserSubscription } from '../controllers/user.js';
import verifyUser from '../middleware/authentication.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllSubs).post(verifyUser, createSubreddit);

router.route('/:id').get(getSingleSubreddit).patch(verifyUser, updateSubreddit);

router.get('/:id/posts', getPostsFromSubreddit);
router.patch(
  '/:id/subscribe',
  verifyUser,
  handleUserSubscription,
  handleSubredditMembers
);

export default router;
