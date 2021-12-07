import Joi from 'joi';

export const authSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(10).lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required(),
});

export const subredditSchema = Joi.object({
  name: Joi.string().alphanum().min(5).lowercase().required(),
  description: Joi.string().required(),
});

export const postSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  content: Joi.string().min(2).max(150).required(),
});

export const commentSchema = Joi.object({
  content: Joi.string().alphanum().min(4).max(100).required(),
  level: Joi.number().optional(),
});
