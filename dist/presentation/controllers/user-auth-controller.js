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

// src/presentation/controllers/user-auth-controller.ts
var user_auth_controller_exports = {};
__export(user_auth_controller_exports, {
  UserAuthController: () => UserAuthController
});
module.exports = __toCommonJS(user_auth_controller_exports);

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

// src/utils/crypto.ts
var import_crypto = __toESM(require("crypto"));
function createMD5(input) {
  const hash = import_crypto.default.createHash("md5");
  hash.update(input);
  return hash.digest("hex").toUpperCase();
}
function compareMD5(input, hash) {
  const inputHash = createMD5(input);
  return inputHash.toUpperCase() === hash.toUpperCase();
}

// src/core/usecases/users/auth/user-auth-usecase.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var UserAuthUseCase = class {
  execute(_0) {
    return __async(this, arguments, function* ({ username, mail, password }) {
      const findUser = yield UserService.auth({ username, mail, password: createMD5(password) });
      if (!findUser)
        throw new Error("User not found");
      if (!findUser.status)
        throw new Error("User not allowed to login");
      const compareHash = compareMD5(password, findUser.password);
      if (!compareHash)
        throw new Error("Username or password invalid");
      const buildDataToken = {
        id: findUser.id,
        name: findUser.name,
        mail: findUser.mail,
        image: findUser.image,
        created_at: findUser.createdAt
      };
      const token = import_jsonwebtoken.default.sign(buildDataToken, env_default.API_SECRET_KEY, { expiresIn: "1d" });
      return token;
    });
  }
};

// src/presentation/controllers/user-auth-controller.ts
var yup = __toESM(require("yup"));
var UserAuthController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const { username, mail, password } = req.body;
        const yupSchema = yup.object({
          username: yup.string().optional(),
          mail: yup.string().optional(),
          password: yup.string().required("Senha \xE9 obrigat\xF3ria")
        });
        const data = yield yupSchema.validate({ username, mail, password });
        if (!data.username && !data.mail)
          throw new Error("Informe o username ou e-mail");
        const userAuthUseCase = new UserAuthUseCase();
        const token = yield userAuthUseCase.execute({ mail: data == null ? void 0 : data.mail, password: data.password });
        return res.status(200).json({ token });
      } catch (err) {
        if (err instanceof Error) {
          return res.status(404).json({ error: err.message });
        }
        return res.status(404).json({ error: err });
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserAuthController
});
