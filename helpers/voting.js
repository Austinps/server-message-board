import createError from 'http-errors';
//import Post from '../models/post.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

// export const handleUserCommentVote = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.user.id);
//     const isUpVoted = user.commentsUpVoted.some((item) => item.equals(id));
//     const isDownVoted = user.commentsDownVoted.some((item) => item.equals(id));
//     const { action } = req.body;

//     if (action === 'up') {
//       if (!isUpVoted && !isDownVoted) {
//         user.commentsUpVoted.push(id);
//       } else if (!isUpVoted && isDownVoted) {
//         user.commentsDownVoted.pull(id);
//         user.commentsUpVoted.push(id);
//       } else if (isUpVoted && !isDownVoted) {
//         user.commentsUpVoted.pull(id);
//       }
//     }
//     if (action === 'down') {
//       if (!isUpVoted && !isDownVoted) {
//         user.commentsDownVoted.push(id);
//       } else if (!isUpVoted && isDownVoted) {
//         user.commentsDownVoted.pull(id);
//       } else if (isUpVoted && !isDownVoted) {
//         user.commentsUpVoted.pull(id);
//         user.commentsDownVoted.push(id);
//       }
//     }
//     req.userVote = { isUpVoted, isDownVoted };
//     await user.save();
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

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
