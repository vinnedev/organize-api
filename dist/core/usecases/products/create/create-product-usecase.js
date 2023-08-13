"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/core/usecases/products/create/create-product-usecase.ts
var create_product_usecase_exports = {};
__export(create_product_usecase_exports, {
  CreateProductUseCase: () => CreateProductUseCase
});
module.exports = __toCommonJS(create_product_usecase_exports);

// src/database/prismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/core/services/products-service.ts
var ProductService = {
  create: (_0) => __async(void 0, [_0], function* ({
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
    image
  }) {
    const createProduct = yield prismaClient.products.create({
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
        image
      }
    });
    return createProduct;
  }),
  list: () => __async(void 0, null, function* () {
    const listProducts = yield prismaClient.products.findMany();
    return listProducts;
  }),
  findById: (id) => __async(void 0, null, function* () {
    const findProductById = yield prismaClient.products.findUnique({
      where: {
        id
      }
    });
    return findProductById;
  }),
  findOne: (where) => __async(void 0, null, function* () {
    const findOne = yield prismaClient.products.findMany({
      where
    });
    return findOne[0];
  }),
  update: (id, data) => __async(void 0, null, function* () {
    const updateProduct = yield prismaClient.products.update({
      where: { id },
      data
    });
    return updateProduct;
  }),
  delete: (id) => __async(void 0, null, function* () {
    const deleteProduct = yield prismaClient.products.delete({ where: { id } });
    return deleteProduct ? true : false;
  })
};

// src/utils/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/utils/calc-profit-margin.ts
function calcProfitMargin(cost, price) {
  if (cost < 0 || price <= 0) {
    return 0;
  }
  const profit = price - cost;
  const profitMargin = profit / cost * 100;
  return profitMargin;
}

// src/utils/list-of-erros.ts
var ErrorListProducts = {
  E01: { message: "Produto j\xE1 existe", statusCode: 400 },
  E02: { message: "C\xF3digo de barra j\xE1 existe em outro produto.", statusCode: 400 }
};

// src/core/usecases/products/create/create-product-usecase.ts
var CreateProductUseCase = class {
  execute(_0) {
    return __async(this, arguments, function* ({
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
    }) {
      const checkProduct = yield ProductService.findOne({ name: name.toUpperCase() });
      if (checkProduct)
        throw new AppError(ErrorListProducts["E01"].message, ErrorListProducts["E01"].statusCode);
      if (barCode) {
        const checkBarCode = yield ProductService.findOne({ barCode });
        if (checkBarCode)
          throw new AppError(ErrorListProducts["E02"].message, ErrorListProducts["E02"].statusCode);
      }
      const createProduct = yield ProductService.create({
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
      });
      return createProduct;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateProductUseCase
});
