import bcrypt from "bcryptjs";

export const passwordHashed = async (password) => {
  const genSalt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, genSalt);
  return hashPassword;
};
