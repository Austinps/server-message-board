import createError from 'http-errors';
import User from '../models/user.js';

import { authSchema } from '../validation/index.js';
import { checkIsEmail } from '../helpers/validators.js';

export const registerUser = async (req, res, next) => {
    try {
        const isInputValid = await authSchema.validateAsync(req.body);

        const { email } = isInputValid;
        const alreadyExists = await User.findOne({ email });
        if (alreadyExists)
            throw createError.Conflict(`${email} is already in use`);

        const newUser = new User(isInputValid);
        await newUser.save();

        const token = await newUser.generateJWT();
        res.header('x-auth-token', 'bearer ' + token)
            .status(200)
            .send(newUser);
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const loginMethod = checkIsEmail(login)
            ? { email: login }
            : { username: login };

        const userToLogin = await User.findOne(loginMethod);
        if (!userToLogin) throw new createError.Unauthorized();

        const doPasswordsMatch = await userToLogin.authenticate(password);
        if (!doPasswordsMatch) throw new createError.Unauthorized();

        const token = await userToLogin.generateJWT();
        res.header('x-auth-token', 'bearer ' + token)
            .status(200)
            .send(userToLogin);
    } catch (err) {
        next(err);
    }
};
