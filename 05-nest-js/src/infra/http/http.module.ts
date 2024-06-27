import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { Module } from '@nestjs/common'
import { DataBaseModule } from '../database/database.module'
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
  imports: [DataBaseModule],
  providers: [CreateQuestionUseCase, FetchRecentQuestionsUseCase],
})
export class HttpModule {}
