import mongoose from 'mongoose';
import { filteredArray } from '../utils/helpers.js';
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for your post.'],
      maxlength: 100,
    },
    content: {
      type: String,
    },
    subreddit: {
      type: Schema.Types.ObjectId,
      ref: 'Subreddit',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Post = model('Post', postSchema);
export default Post;
