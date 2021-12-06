import createError from 'http-errors';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

// export const userPostUpVote = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const { id } = req.params;

//     const isUpVoted = user.postsUpVoted.some((item) => item.equals(id));
//     const isDownVoted = user.postsDownVoted.some((item) => item.equals(id));
//     if (!isUpVoted && !isDownVoted) {
//       user.postsUpVoted.push(id);
//     } else if (!isUpVoted && isDownVoted) {
//       user.postsDownVoted.pull(id);
//       user.postsUpVoted.push(id);
//     } else {
//       user.postsUpVoted.pull(id);
//     }
//     await user.save();
//     req.userVote = { isUpVoted, isDownVoted };
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// export const userPostDownVote = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const { id } = req.params;

//     const isUpVoted = user.postsUpVoted.some((item) => item.equals(id));
//     const isDownVoted = user.postsDownVoted.some((item) => item.equals(id));
//     if (!isUpVoted && !isDownVoted) {
//       user.postsDownVoted.push(id);
//     } else if (isUpVoted && !isDownVoted) {
//       user.postsUpVoted.pull(id);
//       user.postsDownVoted.push(id);
//     } else {
//       user.postsDownVoted.pull(id);
//     }
//     req.userVote = { isUpVoted, isDownVoted };
//     await user.save();
//     next();
//   } catch (err) {
//     next(err);
//   }
// };
// export const handlePostUpVote = async (req, res, next) => {
//   try {
//     const { isUpVoted, isDownVoted } = req.userVote;
//     const { id } = req.params;
//     const post = await Post.findById(id);

//     if (!isUpVoted && !isDownVoted) {
//       post.upVotes += 1;
//     } else if (!isUpVoted && isDownVoted) {
//       post.downVotes -= 1;
//       post.upVotes += 1;
//     } else {
//       post.upVotes -= 1;
//     }
//     await post.save();
//     res.status(200).json(post);
//   } catch (err) {
//     next(err);
//   }
// };

// export const handlePostDownVote = async (req, res, next) => {
//   try {
//     const { isUpVoted, isDownVoted } = req.userVote;
//     const { id } = req.params;
//     const post = await Post.findById(id);

//     if (!isUpVoted && !isDownVoted) {
//       post.downVotes += 1;
//     } else if (isUpVoted && !isDownVoted) {
//       post.downVotes += 1;
//       post.upVotes -= 1;
//     } else {
//       post.downVotes -= 1;
//     }

//     await post.save();
//     res.status(200).json(post);
//   } catch (err) {
//     next(err);
//   }
// };

// export const userCommentUpVote = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.user.id);
//     const { type, action } = req.body;

//     type === 'post' ? handlePostVotes(action) : handleCommentVotes(action);

//     const isUpVoted = user.commentsUpVoted.some((item) => item.equals(id));
//     const isDownVoted = user.commentsDownVoted.some((item) => item.equals(id));

//     if (!isUpVoted && !isDownVoted) {
//       user.commentsUpVoted.push(id);
//     } else if (!isUpVoted && isDownVoted) {
//       user.commentsDownVoted.pull(id);
//       user.commentsUpVoted.push(id);
//     } else {
//       user.commentsUpVoted.pull(id);
//     }
//     req.userVote = { isUpVoted, isDownVoted };
//     await user.save();
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// export const userCommentDownVote = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.user.id);
//     const isUpVoted = user.commentsUpVoted.some((item) => item.equals(id));
//     const isDownVoted = user.commentsDownVoted.some((item) => item.equals(id));
//     if (!isUpVoted && !isDownVoted) {
//       user.commentsDownVoted.push(id);
//     } else if (isUpVoted && !isDownVoted) {
//       user.commentsUpVoted.pull(id);
//       user.commentsDownVoted.push(id);
//     } else {
//       user.commentsDownVoted.pull(id);
//     }

//     req.userVote = { isUpVoted, isDownVoted };
//     await user.save();
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// export const handleCommentUpVote = async (req, res, next) => {
//   try {
//     const { isUpVoted, isDownVoted } = req.userVote;
//     const { id } = req.params;
//     const comment = await Comment.findById(id);
//     if (!comment) throw new createError.NotFound();

//     if (!isUpVoted && !isDownVoted) {
//       comment.upVotes += 1;
//     } else if (!isUpVoted && isDownVoted) {
//       comment.downVotes -= 1;
//       comment.upVotes += 1;
//     } else {
//       comment.upVotes -= 1;
//     }

//     await comment.save();
//     res.status(200).json(comment);
//   } catch (err) {
//     next(err);
//   }
// };

// export const handleCommentDownVote = async (req, res, next) => {
//   try {
//     const { isUpVoted, isDownVoted } = req.userVote;
//     const { id } = req.params;
//     const comment = await Comment.findById(id);
//     if (!comment) throw new createError.NotFound();

//     if (!isUpVoted && !isDownVoted) {
//       comment.downVotes += 1;
//     } else if (isUpVoted && !isDownVoted) {
//       comment.downVotes += 1;
//       comment.upVotes -= 1;
//     } else {
//       comment.downVotes -= 1;
//     }

//     await comment.save();
//     res.status(200).json(comment);
//   } catch (err) {
//     next(err);
//   }
// };
