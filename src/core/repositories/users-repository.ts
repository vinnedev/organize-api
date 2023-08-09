import { UserAuth, Users } from "@core/entities/users";

export interface IUsersRepository {
  auth({ username, mail, password }: UserAuth): Promise<Users | null>;
  create({ name, username, password, mail, image }: Users): Promise<Users>;
  list(): Promise<Users[] | null>;
  findById(id: string): Promise<Users | null>;
  update(id: string, data: Users): Promise<Users>;
  delete(id: string): Promise<boolean>;
}