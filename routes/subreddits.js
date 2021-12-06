import { Router } from 'express';
import {
  getAllSubs,
  getSingleSubreddit,
  createSubreddit,
  handleSubredditMembers,
  updateSubreddit,
} from '../controllers/subreddit.js';
import { getAllPostsFromSubreddit } from '../controllers/post.js';
import { handleUserSubscription } from '../controllers/user.js';
import verifyUser from '../middleware/authentication.js';

const router = Router();

router.route('/').get(getAllSubs).post(verifyUser, createSubreddit);

router.route('/:id').get(getSingleSubreddit).patch(verifyUser, updateSubreddit);

router.get('/:id/posts', getAllPostsFromSubreddit);
router.patch(
  '/:id/subscribe',
  verifyUser,
  handleUserSubscription,
  handleSubredditMembers
);

export default router;
