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

// src/config/env.ts
var env_exports = {};
__export(env_exports, {
  default: () => env_default
});
module.exports = __toCommonJS(env_exports);
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var envConfig = class {
  constructor() {
    this.API_PORT = Number(process.env.API_PORT);
    this.ENV_MODE = process.env.ENV_MODE;
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.API_SECRET_KEY = process.env.API_SECRET_KEY;
  }
};
var env_default = new envConfig();
