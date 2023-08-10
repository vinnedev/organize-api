import { Products } from "@core/entities/products";
import { ProductService } from "@core/services/products-service";
import { AppError } from "@utils/app-error";
import { calcProfitMargin } from "@utils/calc-profit-margin";
import { ErrorListProducts } from "@utils/list-of-erros";

class CreateProductUseCase {
  async execute({
    barCode,
    shortName,
    name,
    image,
    cost,
    price,
    profitMargin,
    stock,
    minStock,
    maxStock }: Products): Promise<Products> {
    const checkProduct = await ProductService.findOne({ name: name.toUpperCase() })
    if (checkProduct) throw new AppError(ErrorListProducts["E01"].message, ErrorListProducts["E01"].statusCode)

    if (barCode) {
      const checkBarCode = await ProductService.findOne({ barCode })
      if (checkBarCode) throw new AppError(ErrorListProducts["E02"].message, ErrorListProducts["E02"].statusCode)
    }

    const createProduct = await ProductService.create({
      barCode,
      shortName: shortName.toUpperCase(),
      name: name.toUpperCase(),
      image,
      cost,
      price,
      profitMargin: profitMargin || calcProfitMargin(cost, price),
      stock,
      minStock,
      maxStock
    })
    return createProduct;
  }
}

export { CreateProductUseCase };

