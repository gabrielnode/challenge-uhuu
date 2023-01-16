import { IAddress, IGeolocation } from '@/domain/model'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'

// export enum BrandEnum {
//   FORD = 'ford',
//   GOL = 'gol'
// }

export class GeolocationDTO implements Omit<IGeolocation, 'id'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  latitude: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  longitude: string
}
