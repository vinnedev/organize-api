import { Address } from "./anddress";
import { Contact } from "./contact";

export type Suppliers = {
    id?: string,
    taxnumber: string,
    corporateName: string,
    tradeName: string,
    address: Address,
    contact: Contact
}