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

// src/presentation/middleware/ensureAuthenticate.ts
var ensureAuthenticate_exports = {};
__export(ensureAuthenticate_exports, {
  default: () => ensureAuthenticate_default
});
module.exports = __toCommonJS(ensureAuthenticate_exports);

// src/config/env.ts
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

// src/database/prismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/core/services/users-service.ts
var UserService = {
  create: (_0) => __async(void 0, [_0], function* ({ name, username, password, mail, image }) {
    const createUser = yield prismaClient.users.create({
      data: {
        name,
        username,
        password,
        mail,
        image
      }
    });
    return createUser;
  }),
  list: () => __async(void 0, null, function* () {
    const listUsers = yield prismaClient.users.findMany();
    return listUsers;
  }),
  findOne: (where) => __async(void 0, null, function* () {
    const findOne = yield prismaClient.users.findMany({
      where
    });
    return findOne[0];
  }),
  findById: (id) => __async(void 0, null, function* () {
    const findUserById = yield prismaClient.users.findUnique({
      where: {
        id
      }
    });
    return findUserById;
  }),
  auth: (_0) => __async(void 0, [_0], function* ({ mail, password }) {
    const findOne = yield prismaClient.users.findMany({
      where: {
        mail,
        password
      }
    });
    return findOne[0];
  }),
  update: (id, data) => __async(void 0, null, function* () {
    const updateUser = yield prismaClient.users.update({
      where: { id },
      data
    });
    return updateUser;
  }),
  delete: (id) => __async(void 0, null, function* () {
    const deleteUserById = yield prismaClient.users.delete({
      where: {
        id
      }
    });
    return deleteUserById ? true : false;
  })
};

// src/presentation/middleware/ensureAuthenticate.ts
var jwt = __toESM(require("jsonwebtoken"));
var authMiddleware = class {
  ensureUserAuth(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { authorization } = req.headers;
        const token = authorization == null ? void 0 : authorization.split(" ")[1];
        if (!authorization) {
          return res.status(401).json({ error: "Authorization header not found." });
        }
        if (!token) {
          return res.status(401).json({ error: "Token not found" });
        }
        const decoded = jwt.verify(token, env_default.API_SECRET_KEY);
        const { mail } = decoded;
        const user = yield UserService.findOne({ mail });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
      } catch (err) {
        return res.status(401).json({ error: err });
      }
    });
  }
};
var ensureAuthenticate_default = new authMiddleware();
