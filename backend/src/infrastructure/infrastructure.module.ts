import { Module } from '@nestjs/common'
import { UserEntity, UserEntitySchema } from './entities/user.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }])],
  exports: [MongooseModule]
})
export class InfrastructureModule {}
