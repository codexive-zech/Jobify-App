import jwt from "jsonwebtoken";
export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.DAY,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodeToken;
};
