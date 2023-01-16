import { IUser } from '@/domain/model'
import { ICreateUser, IUserUpdate, IUserDelete } from '@/domain/repositories'
import { UserEntity } from '@/infrastructure/entities/user.entity'
import { UserDTO } from '@/shared/dto/user.dto'
import { Inject, Injectable } from '@nestjs/common'
import { DeleteResult } from 'mongodb'
import { UsecasesModule } from '../usecases.module'

interface IRepository extends ICreateUser<IUser, UserEntity>, IUserDelete<DeleteResult>, IUserUpdate<UserEntity> {}

@Injectable()
export class UserUsecase {
  constructor(
    @Inject(UsecasesModule.USER_REPOSITORY)
    private readonly userRepository: IRepository
  ) {}

  async createUser(data: UserDTO) {
    return await this.userRepository.createNew(data)
  }
  async getUserAll() {
    return await this.userRepository.findAll()
  }

  async removeAll() {
    return this.userRepository.removeAll()
  }
}
