import Joi from 'joi';

const postSchema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    content: Joi.string().min(2).max(150).required()
});

export default postSchema;
