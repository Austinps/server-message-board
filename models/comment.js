import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'Write something...'],
            minlength: 1
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        repliedTo: {
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
commentSchema.pre('updateOne', () => {});
commentSchema.set('toObject', { virtuals: true });

const Comment = mongoose.models.Comment || model('Comment', commentSchema);

export default Comment;
