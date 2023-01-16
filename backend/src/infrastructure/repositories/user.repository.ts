import { IUser } from '@/domain/model'
import { ICreateUser, IUserDelete, IUserUpdate } from '@/domain/repositories'
import { UserEntity, UserEntityDocument } from '../entities/user.entity'
import { Model } from 'mongoose'
import { UserDTO } from '@/shared/dto/user.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DeleteResult } from 'mongodb'

@Injectable()
export class UserRepository
  implements ICreateUser<IUser, UserEntity>, IUserDelete<DeleteResult>, IUserUpdate<UserEntity>
{
  constructor(@InjectModel(UserEntity.name) private readonly userModel: Model<UserEntityDocument>) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userModel.find()
  }

  async createNew(data: UserDTO): Promise<UserEntity> {
    return await this.userModel.create(data)
  }

  async removeAll(): Promise<DeleteResult> {
    return await this.userModel.deleteMany({})
  }
}
