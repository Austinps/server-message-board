import createError from 'http-errors';

import Post from '../models/post.js';
import Subreddit from '../models/subreddit.js';
import { getRandomColor } from '../helpers/helpers.js';

export const getAllSubs = async (req, res, next) => {
  try {
    const subreddits = await Subreddit.find(req.query);
    res.status(200).send(subreddits);
  } catch (err) {
    next(err);
  }
};

export const getSingleSubreddit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subreddit = await Subreddit.findById(id);
    if (!subreddit) throw new createError.NotFound();
    res.status(200).send(subreddit);
  } catch (err) {
    next(err);
  }
};

export const createSubreddit = async (req, res, next) => {
  try {
    const { id } = req.user;
    const newSubreddit = new Subreddit({
      ...req.body,
      members: [id],
      moderator: id,
      coverColor: getRandomColor(),
    });

    await newSubreddit.save();
    res.status(201).send(newSubreddit);
  } catch (err) {
    next(err);
  }
};

export const getSubredditPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ subreddit: req.params.id })
      .select('-comments')
      .populate('user', 'username')
      .populate('subreddit', ['name', 'communityIcon']);

    if (!posts) throw new createError.NotFound();
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

export const handleSubredditMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subreddit = await Subreddit.findById(id);

    if (!req.isSubscribed) {
      subreddit.members.push(req.user.id);
      subreddit.membersCount += 1;
    } else {
      subreddit.members.pull(req.user.id);
      subreddit.membersCount -= 1;
    }

    subreddit.save();
    res.status(200).send(subreddit);
  } catch (err) {
    next(err);
  }
};

export const updateSubreddit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subreddit = await Subreddit.findOneAndUpdate(
      { id, moderator: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('moderator', ['username']);
    if (!subreddit) throw new createError.Unauthorized();
    res.status(200).send(subreddit);
  } catch (err) {
    next(err);
  }
};
