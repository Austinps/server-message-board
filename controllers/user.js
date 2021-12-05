import createError from 'http-errors';
import User from '../models/user.js';
import Comment from '../models/comment.js';

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

export const getUserPosts = async (req, res, next) => {
  try {
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

    if (!user) throw new createError.NotFound();
    res.json(user.posts);
  } catch (err) {
    next(err);
  }
};

export const getUserComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ user: id });

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// export const getUserComments = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id)
//       .populate({
//         path: 'comments',
//         populate: {
//           path: 'user',
//           model: 'User',
//           select: 'username avatar',
//         },
//       })
//       .populate({
//         path: 'comments',
//         populate: { path: 'post', model: 'Post', select: 'title' },
//       });
//     if (!user) throw new createError.NotFound();
//     res.json(user.comments);
//   } catch (err) {
//     next(err);
//   }
// };
