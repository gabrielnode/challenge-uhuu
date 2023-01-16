import { IAddress, IGeolocation } from '@/domain/model'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { GeolocationDTO } from './geolocation.dto'

// export enum BrandEnum {
//   FORD = 'ford',
//   GOL = 'gol'
// }

export class AddressDTO implements Omit<IAddress, 'id'> {
  @IsNotEmpty()
  @IsString()
  publicPlace?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number?: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  neighborhood?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  complement?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  state: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  district: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  zipCode: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string

  @IsNotEmpty()
  @ValidateNested({
    each: true
  })
  @Type(() => GeolocationDTO)
  geolocation: GeolocationDTO
}
