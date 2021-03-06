import createError from 'http-errors';
import User from '../models/User.js';
import { handleUserVote } from '../helpers/voting.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(req.query).lean();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
};

export const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).lean();
        if (!user) new createError.NotFound();
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!updatedUser) throw new createError.NotFound();
        res.status(200).send(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.id === id) await User.findOneAndDelete({ id });
        else throw new createError.Unauthorized();

        res.status(204).send('dfdfggf');
    } catch (err) {
        next(err);
    }
};

export const handleUserSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.id);
        const { subscriptions } = user;

        req.isSubscribed = subscriptions.some((item) => item.equals(id));
        !req.isSubscribed ? subscriptions.push(id) : subscriptions.pull(id);

        user.save();
        next();
    } catch (err) {
        next(err);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
            .populate('subscriptions', ['name', 'communityIcon'])
            .populate('moderating', ['name', 'communityIcon'])
            .lean();
        if (!user) throw new createError.NotFound();

        const { subscriptions, moderating } = user;
        res.status(200).send({
            subscriptions,
            moderating
        });
    } catch (err) {
        next(err);
    }
};

export const handleUserVoteForPost = async (req, res, next) => {
    try {
        const { id, action } = req.params;
        const user = await User.findById(req.user.id);

        req.userVote = handleUserVote(id, user, action, 'posts');
        await user.save();
        next();
    } catch (err) {
        next(err);
    }
};

export const handleUserVoteForComment = async (req, res, next) => {
    try {
        const { id, action } = req.params;
        const user = await User.findById(req.user.id);

        req.userVote = handleUserVote(id, user, action, 'comments');
        await user.save();
        next();
    } catch (err) {
        next(err);
    }
};
