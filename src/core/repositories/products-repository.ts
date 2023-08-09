import { Products } from '@core/entities/products';
import { Prisma } from '@prisma/client';

export interface IProductsRepository {
  create({
    name,
    shortName,
    barCode,
    cost,
    price,
    profitMargin,
    status,
    stock,
    minStock,
    maxStock,
    image,
  }: Products): Promise<Products>;
  list(): Promise<Products[]>;
  findById(id: string): Promise<Products | null>;
  findOne(where: Prisma.productsWhereUniqueInput): Promise<Products | null>;
  update(id: string, data: Products): Promise<Products>;
  delete(id: string): Promise<boolean>;
}
