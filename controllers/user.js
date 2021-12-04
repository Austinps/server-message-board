import createError from 'http-errors';
import User from '../models/user.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) new createError.NotFound();
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const updateSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) throw new createError.NotFound();
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const handleUserSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const alreadySubscribed = user.subscriptions.some((item) =>
      item.equals(id)
    );
    req.alreadySubscribed = alreadySubscribed;
    if (!alreadySubscribed) {
      user.subscriptions.push(id);
    } else {
      user.subscriptions.pull(id);
    }
    user.save();
    next();
  } catch (err) {
    next(err);
  }
};

export const getUserSubs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate('subscriptions', [
        'name',
        'communityIcon',
        'membersCount',
        'coverColor',
        'description',
      ])
      .populate('moderating', [
        'name',
        'communityIcon',
        'membersCount',
        'coverColor',
        'description',
      ]);
    if (!user) throw new createError.NotFound();
    res.status(200).send({
      subscriptions: user.subscriptions,
      moderating: user.moderating,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { id } = req.params;
    const user = await User.findById(id)
      .populate({
        path: 'posts',
        populate: {
          path: 'user',
          model: 'User',
          select: 'title',
        },
      })
      .populate({
        path: 'posts',
        populate: {
          path: 'subreddit',
          model: 'Subreddit',
          select: 'name communityIcon',
        },
      });
    console.log(user);
    if (!user) throw new createError.NotFound();
    res.json(user.posts);
  } catch (err) {
    next(err);
  }
};

export const getUserComments = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User',
        select: 'username profilePic',
      },
    });
    if (!user) throw new createError.NotFound();
    res.json(user.comments);
  } catch (err) {
    next(err);
  }
};
