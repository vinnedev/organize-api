import { Address } from "./anddress"
import { Contact } from "./contact"

interface Company extends BaseEntity {
    nameCompany: string
    anddress: Address
    contact: Contact
}