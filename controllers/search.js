import Subreddit from '../models/subreddit.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';

const searchSubredditsHelper = (searchTerm) => {
  return Subreddit.find({
    name: { $regex: searchTerm, $options: 'i' },
  })
    .select(['communityIcon', 'name', 'membersCount', 'description'])
    .lean();
};

const searchPostsHelper = (searchTerm) => {
  return Post.find({
    title: { $regex: searchTerm, $options: 'i' },
  })
    .populate('user', ['username'])
    .populate('subreddit', ['name', 'communityIcon'])
    .lean();
};

const searchCommentsHelper = (searchTerm) => {
  return Comment.find({
    content: { $regex: searchTerm, $options: 'i' },
  })
    .populate('post', ['title'])
    .populate('user', ['username'])
    .lean();
};

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
