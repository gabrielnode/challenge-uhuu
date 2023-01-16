import { IGeolocation } from '@/domain/model'

export interface IAddress {
  publicPlace?: string
  number?: number
  neighborhood?: string
  complement?: string
  city: string
  state: string
  district: string
  country: string
  geolocation: IGeolocation
}
