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

export const updateUser = async (req, res, next) => {
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

export const handleUserPostVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const isUpVoted = user.postsUpVoted.some((item) => item.equals(id));
    const isDownVoted = user.postsDownVoted.some((item) => item.equals(id));
    const { action } = req.body;

    action === 'up' ? user.postsDownVoted.pull(id) : user.postsUpVoted.pull(id);
    if (!isUpVoted && !isDownVoted) {
      action === 'up'
        ? user.postsUpVoted.push(id)
        : user.postsDownVoted.push(id);
    } else if (!isUpVoted && isDownVoted) {
      action === 'up'
        ? user.postsUpVoted.push(id)
        : user.postsDownVoted.pull(id);
    } else if (isUpVoted && !isDownVoted) {
      action === 'up'
        ? user.postsUpVoted.pull(id)
        : user.postsDownVoted.push(id);
    }

    req.userVote = { isUpVoted, isDownVoted };
    await user.save();
    next();
  } catch (err) {
    next(err);
  }
};
export const handleUserCommentVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const isUpVoted = user.commentsUpVoted.some((item) => item.equals(id));
    const isDownVoted = user.commentsDownVoted.some((item) => item.equals(id));
    const { action } = req.body;

    action === 'up'
      ? user.commentsDownVoted.pull(id)
      : user.commentsUpVoted.pull(id);
    if (!isUpVoted && !isDownVoted) {
      action === 'up'
        ? user.commentsUpVoted.push(id)
        : user.commentsDownVoted.push(id);
    } else if (!isUpVoted && isDownVoted) {
      action === 'up'
        ? user.commentsUpVoted.push(id)
        : user.commentsDownVoted.pull(id);
    } else if (isUpVoted && !isDownVoted) {
      action === 'up'
        ? user.commentsUpVoted.pull(id)
        : user.commentsDownVoted.push(id);
    }

    req.userVote = { isUpVoted, isDownVoted };
    await user.save();
    next();
  } catch (err) {
    next(err);
  }
};
