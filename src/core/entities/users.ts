export type Users = {
  id?: string;
  name: string;
  username: string;
  password: string;
  mail: string;
  image?: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAuth = {
  username?: string
  mail?: string
  password: string
}
