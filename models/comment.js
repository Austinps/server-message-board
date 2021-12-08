import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        inReplyTo: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        level: {
            type: Number,
            default: 0
        },
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

commentSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Comment = mongoose.models.Comment || model('Comment', commentSchema);

export default Comment;
