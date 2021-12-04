import { Router } from 'express';
import {
  searchSubreddits,
  searchPosts,
  searchComments,
  searchAll,
} from '../controllers/search.js';

const router = Router({ mergeParams: true });

router.get('/all', searchAll);
router.get('/subreddits', searchSubreddits);
router.get('/posts', searchPosts);
router.get('/comments', searchComments);

export default router;
