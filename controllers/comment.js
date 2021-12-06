import mongoose from 'mongoose';
import createError from 'http-errors';

import Comment from '../models/Comment.js';

export const getCommentsFromPost = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ post: id }).populate('author', [
    'username',
    'avatar',
  ]);
  res.status(200).send(comments);
};
export const createComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { content, repliedTo, level } = req.body;
    const newComment = new Comment({
      content,
      post: mongoose.Types.ObjectId(id),
      author: req.user.id,
      repliedTo: repliedTo ? repliedTo : null,
      level,
    });
    req.populatedComment = await newComment.save();

    req.populatedComment.populate('author', ['username', 'avatar', 'post']);
    next();
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const commentToBeUpdated = await Comment.findOneAndUpdate(
      { id, author: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('author', ['username']);
    if (!commentToBeUpdated) throw new createError.Unauthorized();
    res.status(200).send(commentToBeUpdated);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.commentId;
    const commentToBeDeleted = await Comment.findByIdAndUpdate(
      { id, author: req.user.id },
      { content: '[deleted]', user: null },
      { new: true }
    );
    if (!commentToBeDeleted) throw new createError.Unauthorized();
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getAllCommentsByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ user: id });

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export const handleCommentVoteTotals = async (req, res, next) => {
  try {
    const { isUpVoted, isDownVoted } = req.userVote;
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) throw new createError.NotFound();
    const { action } = req.body;

    if (!isUpVoted) {
      action === 'up'
        ? (comment.upVotes += 1)
        : !isDownVoted
        ? (comment.downVotes += 1)
        : (comment.downVotes -= 1);
    } else if (isUpVoted) {
      action === 'up'
        ? (comment.upVotes -= 1)
        : !isDownVoted
        ? (comment.downVotes += 1)
        : (comment.downVotes -= 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

// export const handleCommentVoteTotals = async (req, res, next) => {
//   try {
//     const { isUpVoted, isDownVoted } = req.userVote;
//     const { id } = req.params;
//     const comment = await Comment.findById(id);
//     if (!comment) throw new createError.NotFound();
//     const { action } = req.body;

//     if (action === 'up') {
//       if (!isUpVoted && !isDownVoted) {
//         comment.upVotes += 1;
//       } else if (!isUpVoted && isDownVoted) {
//         comment.downVotes -= 1;
//         comment.upVotes += 1;
//       } else {
//         comment.upVotes -= 1;
//       }
//     }
//     if (action === 'down') {
//       if (!isUpVoted && !isDownVoted) {
//         comment.downVotes += 1;
//       } else if (isUpVoted && !isDownVoted) {
//         comment.downVotes += 1;
//         comment.upVotes -= 1;
//       } else {
//         comment.downVotes -= 1;
//       }
//     }

//     await comment.save();
//     res.status(200).json(comment);
//   } catch (err) {
//     next(err);
//   }
// };
