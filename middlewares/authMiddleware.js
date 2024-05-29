import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError("Authorization Invalid");
  }
  try {
    const payload = verifyJWT(token);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authorization Invalid");
  }
};

export const authorizedPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not Authorized To Access This Route");
    }
    next();
  };
};
