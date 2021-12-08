import { searchSubredditsHelper } from './subreddits.js';
import { searchPostsHelper } from './posts.js';
import { searchCommentsHelper } from './comments.js';

// export const sendSearchResults = () => {
//   const { results } = req;
//   res.status(200).send(results);
// };

export const searchAll = async (req, res, next) => {
    try {
        const searchTerm = req.query.search;
        const subreddits = await searchSubredditsHelper(searchTerm);
        const posts = await searchPostsHelper(searchTerm);
        const comments = await searchCommentsHelper(searchTerm);
        res.status(200).send({ subreddits, posts, comments });
    } catch (err) {
        next(err);
    }
};

export const searchSubreddits = async (req, res, next) => {
    try {
        const searchTerm = req.query.search;
        const subreddits = await searchSubredditsHelper(searchTerm);
        res.status(200).send(subreddits);
    } catch (err) {
        next(err);
    }
};

export const searchPosts = async (req, res, next) => {
    try {
        const searchTerm = req.query.search;
        const posts = await searchPostsHelper(searchTerm);
        res.status(200).send(posts);
    } catch (err) {
        next(err);
    }
};

export const searchComments = async (req, res, next) => {
    try {
        const searchTerm = req.query.search;
        const comments = await searchCommentsHelper(searchTerm);
        res.status(200).send(comments);
    } catch (err) {
        next(err);
    }
};
