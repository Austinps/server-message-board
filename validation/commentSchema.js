import Joi from 'joi';

const commentSchema = Joi.object({
    content: Joi.string().alphanum().min(4).max(100).required(),
    level: Joi.number().optional()
});

export default commentSchema;
