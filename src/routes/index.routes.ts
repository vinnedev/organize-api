import { Router } from "express";
import { userSession } from "./user/session.routes";

const routes = Router()

routes.get('/', (_, res) => res.status(200).send('Hello world!'));
routes.use('/user', userSession)

export { routes };

