import createError from "../utils/create-error.util.js";
import genTokenJWT from "../utils/jwt.util.js";

const authMiddleware = {
  checkToken: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) createError(401, "Token is missing");
      const token = authHeader.split(" ")[1];
      const payload = genTokenJWT.checkToken(token);
      req.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  },
  isRole: (role) => (req, res, next) => {
    try {
      if (req.user.role !== role) createError(401, `Invalid role`);
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default authMiddleware;
