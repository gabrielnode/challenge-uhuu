import { IVehicle } from '@/domain/model'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('vehicle')
export class VehicleEntity implements IVehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  vehicle: string

  @Column()
  brand: string

  @Column()
  year: number

  @Column()
  description: string

  @Column()
  sold: boolean

  @Column({ default: new Date() })
  createdAt: Date

  @Column({ default: new Date() })
  updatedAt: Date
}
