import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const subredditSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true
        },
        communityIcon: {
            type: String,
            default: 'https://i.redd.it/ldmw8e3zadd51.jpg'
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        moderator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        coverColor: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

subredditSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

subredditSchema.virtual('membersCount').get(function () {
    return this.members && this.members.length ? this.members.length : 0;
});

const Subreddit =
    mongoose.models.Subreddit || model('Subreddit', subredditSchema);
export default Subreddit;
