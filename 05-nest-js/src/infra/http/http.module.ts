import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticationController } from './controllers/authentication-controller/index.controller'
import { CreateAccountController } from './controllers/create-account/index.controller'
import { CreateQuestionController } from './controllers/create-question-controller/index.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions/index.controller'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
