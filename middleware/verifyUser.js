import createError from 'http-errors';

import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token').split(' ')[1];
    if (!token) throw new createError.Unauthorized();

    const verifiedUser = await User.verifyToken(token);
    if (!verifiedUser) throw new createError.Unauthorized();

    req.user = verifiedUser;
    console.log(req.user.id);
    next();
  } catch (err) {
    next(err);
  }
};

export default verifyUser;
