import { Router } from 'express';

import {
    getCommentsFromPost,
    createComment,
    deleteComment,
    updateComment
} from '../controllers/comments.js';
import verifyUser from '../middleware/authentication.js';
import { pushCommentIdToPost } from '../controllers/posts.js';

const router = Router({ mergeParams: true });

router
    .route('/')
    .get(getCommentsFromPost)
    .post(verifyUser, createComment, pushCommentIdToPost);

router
    .route('/:commentId')
    .patch(verifyUser, updateComment)
    .delete(verifyUser, deleteComment);

export default router;
