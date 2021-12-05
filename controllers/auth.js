import createError from 'http-errors';
import User from '../models/user.js';
import { encryptPassword } from '../helpers/encryption.js';

export const registerUser = async (req, res, next) => {
  try {
    const password = await encryptPassword(req.body.password);
    const newUser = new User({ ...req.body, password });

    await newUser.save();
    const token = await newUser.generateJWT();
    res
      .header('x-auth-token', 'bearer ' + token)
      .status(200)
      .send(newUser);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userToLogin = await User.findOne({ username });
    if (!userToLogin) throw new createError.Unauthorized();

    const doPasswordsMatch = await userToLogin.authenticate(password);
    if (!doPasswordsMatch) throw new createError.Unauthorized();

    const token = await userToLogin.generateJWT();
    res
      .header('x-auth-token', 'bearer ' + token)
      .status(200)
      .send(userToLogin);
  } catch (err) {
    next(err);
  }
};
