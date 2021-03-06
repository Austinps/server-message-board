import createError from 'http-errors';
import Post from '../models/Post.js';
import { postSchema } from '../validation/index.js';

import { handleDocumentVote } from '../helpers/voting.js';

export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('author', 'username')
            .populate('subreddit', ['name', 'communityIcon'])
            .lean();

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
            .populate('subreddit', ['name', 'communityIcon'])
            .lean();
        if (!post) throw new createError.NotFound();
        res.json(post);
    } catch (err) {
        next(err);
    }
};

export const createPost = async (req, res, next) => {
    try {
        const isInputValid = await postSchema.validateAsync(req.body);

        const { title, content } = isInputValid;
        const newPost = new Post({
            title,
            content,
            subreddit: req.params.id,
            author: req.user.id
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

export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOneAndUpdate(
            { id, author: req.user.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!post) throw new createError.Unauthorized();
        res.status(200).send(post);
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOneAndDelete({ id, author: req.user.id });
        if (!post) throw new createError.Unauthorized();

        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

export const getPostsFromSubreddit = async (req, res, next) => {
    try {
        const posts = await Post.find({ subreddit: req.params.id })
            .select('-comments')
            .populate('author', 'username')
            .populate('subreddit', ['name', 'communityIcon'])
            .lean();

        if (!posts) throw new createError.NotFound();
        res.status(200).send(posts);
    } catch (err) {
        next(err);
    }
};

export const getPostsByUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ author: id }).lean();

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

        const updatedPost = handleDocumentVote(req, post);

        await updatedPost.save();
        res.status(200).send(updatedPost);
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

export const searchPosts = (searchTerm) => {
    return Post.find({
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { content: { $regex: searchTerm, $options: 'i' } }
        ]
    })
        .populate('author', ['username'])
        .populate('subreddit', ['name', 'communityIcon'])
        .lean();
};
