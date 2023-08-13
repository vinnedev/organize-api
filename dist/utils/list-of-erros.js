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

// src/utils/list-of-erros.ts
var list_of_erros_exports = {};
__export(list_of_erros_exports, {
  ErrorListProducts: () => ErrorListProducts
});
module.exports = __toCommonJS(list_of_erros_exports);
var ErrorListProducts = {
  E01: { message: "Produto j\xE1 existe", statusCode: 400 },
  E02: { message: "C\xF3digo de barra j\xE1 existe em outro produto.", statusCode: 400 }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorListProducts
});
