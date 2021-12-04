import createError from 'http-errors';
import Post from '../models/post.js';
import User from '../models/user.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .select('-comments')
      .populate('user', 'username')
      .populate('subreddit', ['name', 'communityIcon']);

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .select('-comments')
      .populate('user', 'username')
      .populate('subreddit', ['name', 'communityIcon']);
    if (!post) throw new createError.NotFound();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, content, subreddit } = req.body;
    const newPost = new Post({
      title,
      content,
      subreddit,
      user: id,
    });
    await newPost.save();
    const user = await User.findById(id);
    user.posts.push(newPost.id);
    await user.save();
    const populatedPost = await (
      await newPost.populate('user', 'username')
    ).populate('subreddit', ['name', 'communityIcon']);

    res.json(populatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ id, user: req.user.id });
    if (!post) throw new createError.Unauthorized();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndUpdate(
      { id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!post) throw new createError.Unauthorized();
    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};
