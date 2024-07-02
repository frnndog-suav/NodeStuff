import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DataBaseModule } from '../database/database.module'
import { AuthenticationController } from './controllers/authentication-controller/index.controller'
import { CreateAccountController } from './controllers/create-account/index.controller'
import { CreateQuestionController } from './controllers/create-question-controller/index.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions/index.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug/index.controller'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
  ],
  imports: [DataBaseModule, CryptographyModule],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
