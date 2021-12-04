import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

import { promisify } from 'util';

export const signJWT = promisify(sign);
export const verifyJWT = promisify(verify);
