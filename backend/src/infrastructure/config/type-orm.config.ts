import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const typeOrmConfigSql = (config: ConfigService): MongooseModuleOptions => ({
  uri: 'mongodb://mongo_root:mongo_root@mongo:27017'
})
