import mongoose from 'mongoose';
import createError from 'http-errors';

import Post from '../models/post.js';
import Comment from '../models/comment.js';
import User from '../models/user.js';

export const getAllCommentsFromPost = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ post: id }).populate('user', [
    'username',
    'avatar',
  ]);
  res.json(comments);
};

export const createComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { content, repliedTo, level } = req.body;
    const newComment = new Comment({
      content,
      post: mongoose.Types.ObjectId(id),
      user: req.user.id,
      repliedTo: repliedTo ? repliedTo : null,
      level,
    });
    await newComment.save();

    const post = await Post.findById(id);
    post.commentsCount += 1;
    post.comments.push(newComment.id);
    await post.save();

    const populatedComment = await newComment.populate('user', [
      'username',
      'avatar',
    ]);
    res.status(201).send(populatedComment);
  } catch (err) {
    next(err);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOneAndUpdate(
      { id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('user', ['username']);
    if (!comment) throw new createError.Unauthorized();
    res.status(200).send(comment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.commentId;
    const deletedComment = await Comment.findByIdAndUpdate(
      { id, user: req.user.id },
      { content: '[deleted]', user: null },
      { new: true }
    );
    if (!deletedComment) throw new createError.Unauthorized();

    req.user.comments.pull(deletedComment.id);
    await User.findByIdAndUpdate(req.user.id, { comments: req.user.comments });
    res.end();
  } catch (err) {
    next(err);
  }
};
