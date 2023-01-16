import { IAddress, IUser } from '@/domain/model'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserEntityDocument = UserEntity & Document

@Schema({
  collection: 'user'
})
export class UserEntity implements IUser {
  @Prop()
  id: string

  @Prop()
  name: string

  @Prop()
  weight: number

  @Prop({ type: Object })
  address: IAddress

  @Prop({ default: new Date() })
  createdAt: Date
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity)
