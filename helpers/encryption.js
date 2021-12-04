import { hash, compare } from 'bcrypt';

export const encryptPassword = async (password) => {
  const saltRounds = 12;
  return await hash(password, saltRounds);
};

export const comparePassword = async (clearTextPassword, hashedPassword) =>
  await compare(clearTextPassword, hashedPassword);
