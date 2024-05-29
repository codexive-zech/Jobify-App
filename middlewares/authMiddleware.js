import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = async (req, res, next) => {
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
