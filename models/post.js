import mongoose from 'mongoose';
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
    author: {
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

postSchema.virtual('commentsCount').get(function () {
  return this.comments && this.comments.length ? this.comments.length : 0;
});

const Post = mongoose.models.Post || model('Post', postSchema);
export default Post;
