import Post from '../models/post.js';
import Comment from '../models/comment.js';
import User from '../models/user.js';

export const userPostUpVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const alreadyUpVoted = user.postsUpVoted.some((item) => item.equals(id));
    const alreadyDownVoted = user.postsDownVoted.some((item) =>
      item.equals(id)
    );
    if (!alreadyUpVoted && !alreadyDownVoted) {
      user.postsUpVoted.push(id);
    } else if (!alreadyUpVoted && alreadyDownVoted) {
      user.postsDownVoted.pull(id);
      user.postsUpVoted.push(id);
    } else {
      user.postsUpVoted.pull(id);
    }
    await user.save();
    req.userVotes = { alreadyUpVoted, alreadyDownVoted };
    next();
  } catch (err) {
    next(err);
  }
};

export const userPostDownVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const alreadyUpVoted = user.postsUpVoted.some((item) => item.equals(id));
    const alreadyDownVoted = user.postsDownVoted.some((item) =>
      item.equals(id)
    );
    if (!alreadyUpVoted && !alreadyDownVoted) {
      user.postsDownVoted.push(id);
    } else if (alreadyUpVoted && !alreadyDownVoted) {
      user.postsUpVoted.pull(id);
      user.postsDownVoted.push(id);
    } else {
      user.postsDownVoted.pull(id);
    }
    req.userVotes = { alreadyUpVoted, alreadyDownVoted };
    await user.save();
    next();
  } catch (err) {
    next(err);
  }
};
export const handlePostUpVote = async (req, res, next) => {
  try {
    const { alreadyUpVoted, alreadyDownVoted } = req.userVotes;
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!alreadyUpVoted && !alreadyDownVoted) {
      post.upVotes += 1;
    } else if (!alreadyUpVoted && alreadyDownVoted) {
      post.downVotes -= 1;
      post.upVotes += 1;
    } else {
      post.upVotes -= 1;
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const handlePostDownVote = async (req, res, next) => {
  try {
    const { alreadyUpVoted, alreadyDownVoted } = req.userVotes;
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!alreadyUpVoted && !alreadyDownVoted) {
      post.downVotes += 1;
    } else if (alreadyUpVoted && !alreadyDownVoted) {
      post.downVotes += 1;
      post.upVotes -= 1;
    } else {
      post.downVotes -= 1;
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const userCommentUpVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const alreadyUpVoted = user.commentsUpVoted.some((item) => item.equals(id));
    const alreadyDownVoted = user.commentsDownVoted.some((item) =>
      item.equals(id)
    );
    if (!alreadyUpVoted && !alreadyDownVoted) {
      user.commentsUpVoted.push(id);
    } else if (!alreadyUpVoted && alreadyDownVoted) {
      user.commentsDownVoted.pull(id);
      user.commentsUpVoted.push(id);
    } else {
      user.commentsUpVoted.pull(id);
    }
    req.userVotes = { alreadyUpVoted, alreadyDownVoted };
    await user.save();
    next();
  } catch (err) {
    next(err);
  }
};

export const userCommentDownVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const alreadyUpVoted = user.commentsUpVoted.some((item) => item.equals(id));
    const alreadyDownVoted = user.commentsDownVoted.some((item) =>
      item.equals(id)
    );
    if (!alreadyUpVoted && !alreadyDownVoted) {
      user.commentsDownVoted.push(id);
    } else if (alreadyUpVoted && !alreadyDownVoted) {
      user.commentsUpVoted.pull(id);
      user.commentsDownVoted.push(id);
    } else {
      user.commentsDownVoted.pull(id);
    }

    req.userVotes = { alreadyUpVoted, alreadyDownVoted };
    await user.save();
    next();
  } catch (err) {
    next(err);
  }
};

export const handleCommentUpVote = async (req, res, next) => {
  try {
    const { alreadyUpVoted, alreadyDownVoted } = req.userVotes;
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) throw new createHttpError.NotFound();

    if (!alreadyUpVoted && !alreadyDownVoted) {
      comment.upVotes += 1;
    } else if (!alreadyUpVoted && alreadyDownVoted) {
      comment.downVotes -= 1;
      comment.upVotes += 1;
    } else {
      comment.upVotes -= 1;
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

export const handleCommentDownVote = async (req, res, next) => {
  try {
    const { alreadyUpVoted, alreadyDownVoted } = req.userVotes;
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) throw new createHttpError.NotFound();

    if (!alreadyUpVoted && !alreadyDownVoted) {
      comment.downVotes += 1;
    } else if (alreadyUpVoted && !alreadyDownVoted) {
      comment.downVotes += 1;
      comment.upVotes -= 1;
    } else {
      comment.downVotes -= 1;
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};
