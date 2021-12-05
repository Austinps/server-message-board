import {
  searchSubredditsHelper,
  searchPostsHelper,
  searchCommentsHelper,
} from '../helpers/search.js';

export const searchAll = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const subreddits = await searchSubredditsHelper(searchTerm);
    const posts = await searchPostsHelper(searchTerm);
    const comments = await searchCommentsHelper(searchTerm);
    res.json({ subreddits, posts, comments });
  } catch (err) {
    next(err);
  }
};

export const searchSubreddits = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const subreddits = await searchSubredditsHelper(searchTerm);
    res.json(subreddits);
  } catch (err) {
    next(err);
  }
};

export const searchPosts = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const posts = await searchPostsHelper(searchTerm);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const searchComments = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const comments = await searchCommentsHelper(searchTerm);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};
