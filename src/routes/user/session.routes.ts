import { Router } from "express";
import { UserAuthController } from '../../presentation/controllers/user-auth-controller';

const userSession = Router()

userSession.post('/session', (req, res) => {
  const userAuth = new UserAuthController()
  return userAuth.handle(req, res);
})

export { userSession };

