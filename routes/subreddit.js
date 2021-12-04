import { Router } from 'express';
import {
  getAllSubs,
  getSingleSubreddit,
  getSubredditPosts,
  createSubreddit,
  handleSubredditMembers,
  updateSubreddit,
} from '../controllers/subreddit.js';
import { handleUserSubscription } from '../controllers/user.js';
import verifyUser from '../middleware/verifyUser.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllSubs).post(verifyUser, createSubreddit);

router.route('/:id').get(getSingleSubreddit).patch(verifyUser, updateSubreddit);

router.get('/:id/posts', getSubredditPosts);
router.patch(
  '/:id/subscribe',
  verifyUser,
  handleUserSubscription,
  handleSubredditMembers
);

export default router;
