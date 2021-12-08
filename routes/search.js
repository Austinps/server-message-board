import { Router } from 'express';

import { searchOne, searchAll } from '../controllers/search.js';
import { searchSubreddits } from '../controllers/subreddits.js';
import { searchPosts } from '../controllers/posts.js';
import { searchComments } from '../controllers/comments.js';

const router = Router();

router.get('/all', searchAll);
router.get('/subreddits', searchOne(searchSubreddits));
router.get('/posts', searchOne(searchPosts));
router.get('/comments', searchOne(searchComments));

export default router;
