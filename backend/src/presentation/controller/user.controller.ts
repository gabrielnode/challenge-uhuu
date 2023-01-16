import { VehicleDTO, VehicleUpdateDTO } from '@/shared'
import { UserDTO } from '@/shared/dto/user.dto'
import { UserUsecase } from '@/usecases/user'
import { Body, Controller, Delete, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  @Get()
  async getUsers() {
    return await this.userUsecase.getUserAll()
  }

  @Post()
  async createUser(@Body() data: UserDTO) {
    return await this.userUsecase.createUser(data)
  }

  @Delete()
  async removeAll() {
    return await this.userUsecase.removeAll()
  }
}
