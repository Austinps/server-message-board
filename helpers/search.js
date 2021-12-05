import Subreddit from '../models/subreddit.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';

export const searchSubredditsHelper = (searchTerm) => {
  return Subreddit.find({
    name: { $regex: searchTerm, $options: 'i' },
  }).select(['communityIcon', 'name', 'membersCount', 'description']);
};

export const searchPostsHelper = (searchTerm) => {
  return Post.find({
    title: { $regex: searchTerm, $options: 'i' },
  })
    .populate('user', ['username'])
    .populate('subreddit', ['name', 'communityIcon']);
};

export const searchCommentsHelper = (searchTerm) => {
  return Comment.find({
    content: { $regex: searchTerm, $options: 'i' },
  })
    .populate('post', ['title'])
    .populate('user', ['username']);
};
