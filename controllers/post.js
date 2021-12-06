import createError from 'http-errors';
import Post from '../models/Post.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('author', 'username')
      .populate('subreddit', ['name', 'communityIcon']);

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
      .populate('subreddit', ['name', 'communityIcon']);
    if (!post) throw new createError.NotFound();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, content, subreddit } = req.body;
    const newPost = new Post({
      title,
      content,
      subreddit,
      author: id,
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
        runValidators: true,
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
      .populate('subreddit', ['name', 'communityIcon']);

    if (!posts) throw new createError.NotFound();
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

export const getAllPostsByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.findById({ author: id });

    if (!posts) throw new createError.NotFound();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const handlePostVoteTotals = async (req, res, next) => {
  try {
    const { isUpVoted, isDownVoted } = req.userVote;
    console.log(isDownVoted);
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) throw new createError.NotFound();
    const { action } = req.body;

    if (action === 'up') {
      if (!isUpVoted && !isDownVoted) {
        action === 'up' ? (post.upVotes += 1) : (post.downVotes += 1);
      } else if (!isUpVoted && isDownVoted) {
        post.downVotes -= 1;
        post.upVotes += 1;
      } else {
        post.upVotes -= 1;
      }
    }
    if (action === 'down') {
      if (!isUpVoted && !isDownVoted) {
        post.downVotes += 1;
      } else if (isUpVoted && !isDownVoted) {
        post.downVotes += 1;
        post.upVotes -= 1;
      } else {
        post.downVotes -= 1;
      }
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const pushCommentToPost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  post.comments.push(req.populatedComment.id);
  await post.save();
  res.status(201).send(req.populatedComment);
};
