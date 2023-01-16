import { IAddress, IUser, IVehicle } from '@/domain/model'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { AddressDTO } from './address.dto'

export enum BrandEnum {
  FORD = 'ford',
  GOL = 'gol'
}

export class UserDTO implements Omit<IUser, 'id'> {
  @ApiProperty({
    example: 'golf'
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weight: number

  @IsNotEmpty()
  @ValidateNested({
    each: true
  })
  @Type(() => AddressDTO)
  address: AddressDTO
}
