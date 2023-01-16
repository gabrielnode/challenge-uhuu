import { IAddress } from './address.model'

export interface IUser {
  name: string
  weight: number
  address: IAddress
  createdAt?: Date
}
