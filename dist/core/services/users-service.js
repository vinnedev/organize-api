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

// src/core/services/users-service.ts
var users_service_exports = {};
__export(users_service_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(users_service_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});
