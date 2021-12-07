import Joi from 'joi';

const authSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(10).lowercase().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required()
});

export default authSchema;
