import createError from 'http-errors';
import User from '../models/User.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(req.query);
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

    const { subscriptions, moderating } = user;
    res.status(200).send({
      subscriptions,
      moderating,
    });
  } catch (err) {
    next(err);
  }
};

export const handleUserVoteForPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const hasUpVoted = user.postsUpVoted.some((item) => item.equals(id));
    const hasDownVoted = user.postsDownVoted.some((item) => item.equals(id));
    const { action } = req.body;
    if (action !== 'up' && action !== 'down')
      throw new createError.BadRequest();

    action === 'up' ? user.postsDownVoted.pull(id) : user.postsUpVoted.pull(id);
    if (!hasUpVoted && !hasDownVoted) {
      action === 'up'
        ? user.postsUpVoted.push(id)
        : user.postsDownVoted.push(id);
    } else if (!hasUpVoted && hasDownVoted) {
      action === 'up'
        ? user.postsUpVoted.push(id)
        : user.postsDownVoted.pull(id);
    } else if (hasUpVoted && !hasDownVoted) {
      action === 'up'
        ? user.postsUpVoted.pull(id)
        : user.postsDownVoted.push(id);
    }

    await user.save();
    req.userVote = { hasUpVoted, hasDownVoted };
    next();
  } catch (err) {
    next(err);
  }
};

export const handleUserVoteForComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const hasUpVoted = user.commentsUpVoted.some((item) => item.equals(id));
    const hasDownVoted = user.commentsDownVoted.some((item) => item.equals(id));
    const { action } = req.body;
    if (action !== 'up' && action !== 'down')
      throw new createError.BadRequest();

    action === 'up'
      ? user.commentsDownVoted.pull(id)
      : user.commentsUpVoted.pull(id);
    if (!hasUpVoted && !hasDownVoted) {
      action === 'up'
        ? user.commentsUpVoted.push(id)
        : user.commentsDownVoted.push(id);
    } else if (!hasUpVoted && hasDownVoted) {
      action === 'up'
        ? user.commentsUpVoted.push(id)
        : user.commentsDownVoted.pull(id);
    } else if (hasUpVoted && !hasDownVoted) {
      action === 'up'
        ? user.commentsUpVoted.pull(id)
        : user.commentsDownVoted.push(id);
    }

    await user.save();
    req.userVote = { hasUpVoted, hasDownVoted };
    next();
  } catch (err) {
    next(err);
  }
};
