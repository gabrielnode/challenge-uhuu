import { Module } from '@nestjs/common'
import { UserController } from '@/presentation/controller'
import { UsecasesModule } from '@/usecases'
@Module({
  imports: [UsecasesModule.register()],
  controllers: [UserController]
})
export class PresentationModule {}
