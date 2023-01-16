import { DynamicModule, Module } from '@nestjs/common'
import { UserUsecase } from '@/usecases/user'
import { InfrastructureModule } from '@/infrastructure'
import { UserRepository } from '@/infrastructure/repositories'

@Module({
  imports: [InfrastructureModule]
})
export class UsecasesModule {
  static USER_REPOSITORY = 'USER_REPOSITORY'
  static register(): DynamicModule {
    return {
      module: UsecasesModule,
      providers: [
        {
          provide: UserUsecase,
          useClass: UserUsecase
        },
        {
          provide: UsecasesModule.USER_REPOSITORY,
          useClass: UserRepository
        }
      ],
      exports: [UserUsecase]
    }
  }
}
