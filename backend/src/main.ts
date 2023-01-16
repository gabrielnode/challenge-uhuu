import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.create(MainModule, { cors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  )
  const config = new DocumentBuilder()
    .setTitle('Vehicles example')
    .setDescription('The vehicles API description')
    .setVersion('1.0')
    .addTag('vehicles')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
