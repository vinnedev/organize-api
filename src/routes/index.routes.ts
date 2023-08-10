import { Router } from "express";
import authMiddleware from "../presentation/middleware/ensureAuthenticate";
import { productsRouter } from "./products.routes";
import { userSession } from "./user/session.routes";

const routes = Router()

routes.get('/', (_, res) => res.status(200).send('Hello world!'));
routes.use('/user', userSession)
routes.use('/products', authMiddleware.ensureUserAuth, productsRouter)

export { routes };

