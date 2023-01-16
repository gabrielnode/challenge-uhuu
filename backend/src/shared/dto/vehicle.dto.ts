import { IVehicle } from '@/domain/model'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export enum BrandEnum {
  FORD = 'ford',
  GOL = 'gol'
}

export class VehicleDTO implements Omit<IVehicle, 'id'> {
  @ApiProperty({
    example: 'golf'
  })
  @IsNotEmpty()
  @IsString()
  vehicle: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(BrandEnum)
  brand: BrandEnum

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  sold: boolean
}
