import { Users } from "@core/entities/users";

export { };
declare global {
  declare namespace Express {
    interface Request {
      user: Users;
    }
  }
}
