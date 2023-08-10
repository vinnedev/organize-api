import env from "@config/env";
import { UserService } from "@core/services/users-service";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

class authMiddleware {
  async ensureUserAuth(
    req: Request,
    res: Response,
    next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];

      if (!authorization) {
        return res.status(401).json({ error: 'Authorization header not found.' });
      }

      if (!token) {
        return res.status(401).json({ error: 'Token not found' });
      }

      const decoded = jwt.verify(token, env.API_SECRET_KEY);
      const { mail } = (<any>decoded);

      const user = await UserService.findOne({ mail })

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: err });
    }
  }
}

export default new authMiddleware();