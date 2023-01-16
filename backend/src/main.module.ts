import { Module } from '@nestjs/common'
import { PresentationModule } from '@/presentation/presentation.module'
import { UsecasesModule } from '@/usecases/usecases.module'
import { InfrastructureModule } from './infrastructure'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { appConfig, typeOrmConfigSql } from '@/infrastructure/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [
    ConfigModule.forRoot(appConfig()),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfigSql
    }),
    InfrastructureModule,
    PresentationModule,
    UsecasesModule
  ],
  controllers: [],
  providers: []
})
export class MainModule {}
