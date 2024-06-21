import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { AuthenticationController } from './controllers/authentication-controller/index.controller'
import { CreateAccountController } from './controllers/create-account/index.controller'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'
import { CreateQuestionController } from './controllers/create-question-controller/index.controller'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
