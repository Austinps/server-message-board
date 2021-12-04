import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const subredditSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'communities must have a name:/'],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Write something about your community'],
    },
    communityIcon: {
      type: String,
      default: 'https://i.redd.it/ldmw8e3zadd51.jpg',
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    membersCount: {
      type: Number,
      default: 1,
    },
    moderator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    coverColor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

subredditSchema.set('toObject', { virtuals: true });

subredditSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Subreddit = model('Subreddit', subredditSchema);
export default Subreddit;
