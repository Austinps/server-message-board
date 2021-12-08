import createError from 'http-errors';
import Comment from '../models/Comment.js';
import { commentSchema } from '../validation/index.js';
import { handleDocumentVote } from '../helpers/voting.js';

export const getCommentsFromPost = async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.find({ post: id })
        .populate('author', ['username', 'avatar'])
        .lean();
    res.status(200).send(comments);
};

export const createComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isInputValid = await commentSchema.validateAsync(req.body);
        const { content, repliedTo, level } = isInputValid;

        const newComment = new Comment({
            content,
            post: id,
            author: req.user.id,
            repliedTo: repliedTo ? repliedTo : null,
            level
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
                runValidators: true
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

export const getCommentsByUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comments = await Comment.find({ user: id }).lean();

        res.json(comments);
    } catch (err) {
        next(err);
    }
};
export const handleVoteForSingleComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) throw new createError.NotFound();

        const updatedComment = handleDocumentVote(req, comment);

        await updatedComment.save();
        res.status(200).send(updatedComment);
    } catch (err) {
        next(err);
    }
};

export const searchComments = (searchTerm) => {
    return Comment.find({
        content: { $regex: searchTerm, $options: 'i' }
    })
        .populate('post', ['title'])
        .populate('user', ['username'])
        .lean();
};