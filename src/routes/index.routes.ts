import { Router } from "express";
import { userSession } from "./user/session.routes";

const routes = Router()

routes.use('/user', userSession)

export { routes };

