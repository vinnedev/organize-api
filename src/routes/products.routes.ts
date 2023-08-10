import { Router } from "express";
import { ProductController } from "../presentation/controllers/product-controller";


const productsRouter = Router()

productsRouter.post('', (req, res) => {
  const createProductController = new ProductController();
  return createProductController.create(req, res);
})

export { productsRouter };

