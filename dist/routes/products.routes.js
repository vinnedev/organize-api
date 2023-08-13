"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/routes/products.routes.ts
var products_routes_exports = {};
__export(products_routes_exports, {
  productsRouter: () => productsRouter
});
module.exports = __toCommonJS(products_routes_exports);
var import_express = require("express");

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

// src/presentation/controllers/product-controller.ts
var yup = __toESM(require("yup"));
var ProductController = class {
  create(req, res) {
    return __async(this, null, function* () {
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
          maxStock
        } = req.body;
        const yupSchema = yup.object({
          barCode: yup.string().optional(),
          shortName: yup.string().optional().max(20, "Descri\xE7\xE3o curta s\xF3 pode conter no m\xE1ximo 20 caracteres."),
          name: yup.string().required("Nome do produto \xE9 obrigat\xF3ria"),
          image: yup.string().optional(),
          cost: yup.number().required("Custo do produto \xE9 obrigat\xF3rio").min(0),
          price: yup.number().required("Pre\xE7o do produto \xE9 obrigat\xF3rio").min(0),
          profitMargin: yup.number().default(0).optional(),
          stock: yup.number().default(0),
          minStock: yup.number().default(0),
          maxStock: yup.number().default(0)
        });
        const validatedData = yield yupSchema.validate({
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
        });
        const createProductUseCase = new CreateProductUseCase();
        yield createProductUseCase.execute({
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
        });
        return res.status(201).json({ message: "Produto cadastrado com sucesso." });
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ error: err.message });
        }
        return res.status(400).json({ error: err });
      }
    });
  }
};

// src/routes/products.routes.ts
var productsRouter = (0, import_express.Router)();
productsRouter.post("", (req, res) => {
  const createProductController = new ProductController();
  return createProductController.create(req, res);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productsRouter
});
