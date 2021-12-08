import { searchSubreddits } from './subreddits.js';
import { searchPosts } from './posts.js';
import { searchComments } from './comments.js';

export const searchOne = (searchCollection) => {
    return async function (req, res, next) {
        try {
            const searchTerm = req.query.search;
            const results = await searchCollection(searchTerm);
            res.status(200).send(results);
        } catch (err) {
            next(err);
        }
    };
};

export const searchAll = async (req, res, next) => {
    try {
        const searchTerm = req.query.search;
        const subreddits = await searchSubreddits(searchTerm);
        const posts = await searchPosts(searchTerm);
        const comments = await searchComments(searchTerm);
        res.status(200).send({ subreddits, posts, comments });
    } catch (err) {
        next(err);
    }
};
