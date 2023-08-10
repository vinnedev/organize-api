import { CreateProductUseCase } from '@core/usecases/products/create/create-product-usecase';
import { Request, Response } from 'express';
import * as yup from 'yup';

class ProductController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        barCode,
        shortName,
        name,
        image,
        cost,
        price,
        profitMargin,
        stock,
        minStock,
        maxStock } = req.body

      const yupSchema = yup.object({
        barCode: yup.string().optional(),
        shortName: yup.string().optional()
          .max(20, 'Descrição curta só pode conter no máximo 20 caracteres.'),
        name: yup.string().required('Nome do produto é obrigatória'),
        image: yup.string().optional(),
        cost: yup.number().required('Custo do produto é obrigatório').min(0),
        price: yup.number().required('Preço do produto é obrigatório').min(0),
        profitMargin: yup.number().default(0).optional(),
        stock: yup.number().default(0),
        minStock: yup.number().default(0),
        maxStock: yup.number().default(0),
      })

      const validatedData = await yupSchema.validate({
        barCode,
        shortName,
        name,
        image,
        cost,
        price,
        profitMargin,
        stock,
        minStock,
        maxStock
      })

      const createProductUseCase = new CreateProductUseCase()
      await createProductUseCase.execute({
        barCode: validatedData.barCode,
        shortName: validatedData.shortName || validatedData.name.substring(0, 20),
        name: validatedData.name,
        image: validatedData.image,
        cost: validatedData.cost,
        price: validatedData.price,
        profitMargin: validatedData.profitMargin,
        stock: validatedData.stock,
        minStock: validatedData.minStock,
        maxStock: validatedData.maxStock
      })

      return res.status(201).json({ message: 'Produto cadastrado com sucesso.' })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message })
      }
      return res.status(400).json({ error: err })
    }
  }
}

export { ProductController };

