import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import createError from 'http-errors';

import { encryptPassword, comparePassword } from '../helpers/encryption.js';
import { signJWT, verifyJWT } from '../helpers/authentication.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [7, 'Usernames must have at least 7 characters'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subreddit',
      },
    ],
    moderating: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subreddit',
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    postsUpVoted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    postsDownVoted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    commentsUpVoted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    commentsDownVoted: [
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

// userSchema.virtual('prefixedName').get(function () {
//   return `u/${this.username}`;
// });

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

userSchema.method('authenticate', async function (clearTextPassword) {
  // Compare the encrypted password with the given one
  return await comparePassword(clearTextPassword, this.password);
});

userSchema.method('generateJWT', async function () {
  return await signJWT(
    { username: this.username, id: this.id },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
});

userSchema.static('verifyToken', async function (token) {
  try {
    const decodedToken = await verifyJWT(token, process.env.JWT_SECRET);
    const user = await this.findById(decodedToken.id);
    //console.log(user);
    return user;
  } catch (err) {
    throw new createError.Unauthorized();
  }
});

const User = mongoose.models.User || model('User', userSchema);
export default User;
