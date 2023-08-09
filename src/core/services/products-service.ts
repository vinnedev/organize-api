import { Products } from "@core/entities/products";
import { IProductsRepository } from "@core/repositories/products-repository";
import { prismaClient } from "@prisma";
import { Prisma } from "@prisma/client";

export const ProductService: IProductsRepository = {
  create: async ({
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
  }: Products): Promise<Products> => {
    const createProduct = await prismaClient.products.create({
      data: {
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
      }
    })
    return createProduct;
  },
  list: async (): Promise<Products[]> => {
    const listProducts = await prismaClient.products.findMany();
    return listProducts;
  },
  findById: async (id: string): Promise<Products | null> => {
    const findProductById = await prismaClient.products.findUnique({
      where: {
        id
      }
    })
    return findProductById;
  },
  findOne: async (where: Prisma.productsWhereUniqueInput): Promise<Products | null> => {
    const findOne = await prismaClient.products.findUnique({
      where
    })
    return findOne;
  },
  update: async (id: string, data: Products): Promise<Products> => {
    const updateProduct = await prismaClient.products.update({
      where: { id },
      data
    })
    return updateProduct;
  },
  delete: async (id: string): Promise<boolean> => {
    const deleteProduct = await prismaClient.products.delete({ where: { id } })
    return deleteProduct ? true : false
  }
}