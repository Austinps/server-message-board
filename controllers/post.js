import createError from 'http-errors';
import Post from '../models/Post.js';
import { reverseVotesOnUp, reverseVotesOnDown } from '../helpers/voting.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('author', 'username')
      .populate('subreddit', ['name', 'communityIcon']);

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate('author', ['username', 'avatar'])
      .populate('subreddit', ['name', 'communityIcon']);
    if (!post) throw new createError.NotFound();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createSinglePost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, content, subreddit } = req.body;
    const newPost = new Post({
      title,
      content,
      subreddit,
      author: id,
    });
    await newPost.save();
    const populatedPost = await (
      await newPost.populate('author', 'username')
    ).populate('subreddit', ['name', 'communityIcon']);

    res.json(populatedPost);
  } catch (err) {
    next(err);
  }
};

export const updateSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndUpdate(
      { id, author: req.user.id },
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

export const deleteSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ id, author: req.user.id });
    if (!post) throw new createError.Unauthorized();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const getAllPostsFromSubreddit = async (req, res, next) => {
  try {
    const posts = await Post.find({ subreddit: req.params.id })
      .select('-comments')
      .populate('author', 'username')
      .populate('subreddit', ['name', 'communityIcon']);

    if (!posts) throw new createError.NotFound();
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

export const getAllPostsByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ author: id });

    if (!posts) throw new createError.NotFound();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const handleVoteForSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) throw new createError.NotFound();

    const { hasUpVoted, hasDownVoted } = req.userVote;
    const { action } = req.body;

    if (!hasUpVoted && !hasDownVoted)
      action === 'up' ? (post.upVotes += 1) : (post.downVotes += 1);
    if (!hasUpVoted && hasDownVoted)
      action === 'up' ? reverseVotesOnUp('post') : (post.downVotes -= 1);
    if (hasUpVoted && !hasDownVoted)
      action === 'up' ? (post.upVotes -= 1) : reverseVotesOnDown('post');

    await post.save();
    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};

export const pushCommentIdToPost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  post.comments.push(req.populatedComment.id);
  await post.save();
  res.status(201).send(req.populatedComment);
};
