import Joi from 'joi';

const subredditSchema = Joi.object({
    name: Joi.string().alphanum().min(5).lowercase().required(),
    description: Joi.string().required()
});

export default subredditSchema;
