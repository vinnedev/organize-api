import { Users } from "@core/entities/users";
import { IUsersRepository } from "@core/repositories/users-repository";
import { prismaClient } from "@prisma";
import { Prisma } from "@prisma/client";

export const UserService: IUsersRepository = {
  create: async ({ name, username, password, mail, image }: Users): Promise<Users> => {
    const createUser = await prismaClient.users.create({
      data: {
        name,
        username,
        password,
        mail,
        image
      }
    })
    return createUser;
  },
  list: async (): Promise<Users[]> => {
    const listUsers = await prismaClient.users.findMany();
    return listUsers;
  },
  findOne: async (where: Prisma.usersWhereUniqueInput): Promise<Users | null> => {
    const findOne = await prismaClient.users.findMany({
      where
    })
    return findOne[0];
  },
  findById: async (id: string): Promise<Users | null> => {
    const findUserById = await prismaClient.users.findUnique({
      where: {
        id
      }
    })
    return findUserById;
  },
  auth: async ({ mail, password }: Users): Promise<Users | null> => {
    const findOne = await prismaClient.users.findMany({
      where: {
        mail,
        password
      }
    })
    return findOne[0];
  },
  update: async (id: string, data: Users): Promise<Users> => {
    const updateUser = await prismaClient.users.update({
      where: { id },
      data
    })
    return updateUser;
  },
  delete: async (id: string): Promise<boolean> => {
    const deleteUserById = await prismaClient.users.delete({
      where: {
        id
      }
    })
    return deleteUserById ? true : false;
  }
}