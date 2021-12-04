import Subreddit from '../models/subreddit.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';

export const searchSubreddits = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const subreddits = await Subreddit.find({
      name: { $regex: searchTerm, $options: 'i' },
    }).select(['communityIcon', 'name', 'membersCount', 'description']);
    res.json(subreddits);
  } catch (err) {
    next(err);
  }
};

export const searchPosts = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const posts = await Post.find({
      title: { $regex: searchTerm, $options: 'i' },
    })
      .populate('user', ['username'])
      .populate('subreddit', ['name', 'communityIcon']);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const searchComments = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const comments = await Comment.find({
      content: { $regex: searchTerm, $options: 'i' },
    })
      .populate('post', ['title'])
      .populate('user', ['username']);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export const searchAll = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const subreddits = await Subreddit.find({
      name: { $regex: searchTerm, $options: 'i' },
    }).select(['communityIcon', 'name', 'membersCount', 'description']);
    const posts = await Post.find({
      title: { $regex: searchTerm, $options: 'i' },
    })
      .populate('user', ['username'])
      .populate('subreddit', ['name', 'communityIcon']);
    const comments = await Comment.find({
      content: { $regex: searchTerm, $options: 'i' },
    })
      .populate('post', ['title'])
      .populate('user', ['username'])
      .populate('subreddit', ['name', 'communityIcon']);
    res.json({ subreddits, posts, comments });
  } catch (err) {
    next(err);
  }
};
