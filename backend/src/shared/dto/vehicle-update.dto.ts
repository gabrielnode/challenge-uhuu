import { IVehicle } from '@/domain/model'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class VehicleUpdateDTO implements Omit<IVehicle, 'id'> {
  @IsOptional()
  @IsString()
  vehicle: string

  @IsOptional()
  @IsString()
  brand: string

  @IsOptional()
  @IsNumber()
  year: number

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsBoolean()
  sold: boolean
}
