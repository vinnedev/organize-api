import { Address } from "./anddress";
import { Contact } from "./contact";

export type Users = {
  id?: string 
  name: string
  username: string
  password: string
  anddress: Address
  mail: string
  image?: string | null
  status: boolean
  createdAt: Date
  updatedAt: Date
  address: Address,
  contact: Contact
};

export type UserAuth = {
  username?: string
  mail?: string
  password: string
}
