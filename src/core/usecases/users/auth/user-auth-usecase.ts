import env from "@config/env";
import { UserAuth } from "@core/entities/users";
import { UserService } from "@core/services/users-service";
import { compareMD5, createMD5 } from "@utils/crypto";
import jwt from "jsonwebtoken";

class UserAuthUseCase {
  async execute({ username, mail, password }: UserAuth): Promise<string> {
    const findUser = await UserService.auth({ username, mail, password: createMD5(password) })

    if (!findUser) throw new Error('User not found')
    if (!findUser.status) throw new Error('User not allowed to login')

    const compareHash = compareMD5(password, findUser.password)
    if (!compareHash) throw new Error('Username or password invalid')

    const buildDataToken = {
      id: findUser.id,
      name: findUser.name,
      mail: findUser.mail,
      image: findUser.image,
      created_at: findUser.createdAt
    }

    const token = jwt.sign(buildDataToken, env.API_SECRET_KEY, { expiresIn: '1d' });
    return token;
  }
}

export { UserAuthUseCase };

