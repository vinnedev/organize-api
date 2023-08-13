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

// src/core/services/products-service.ts
var products_service_exports = {};
__export(products_service_exports, {
  ProductService: () => ProductService
});
module.exports = __toCommonJS(products_service_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductService
});
