import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DataBaseModule } from '../database/database.module'
import { AnswerQuestionController } from './controllers/answer-question/index.controller'
import { AuthenticationController } from './controllers/authentication/index.controller'
import { CreateAccountController } from './controllers/create-account/index.controller'
import { CreateQuestionController } from './controllers/create-question/index.controller'
import { DeleteQuestionController } from './controllers/delete-question/index.controller'
import { EditAnswerController } from './controllers/edit-answer/index.controller'
import { EditQuestionController } from './controllers/edit-question/index.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions/index.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug/index.controller'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
  ],
  imports: [DataBaseModule, CryptographyModule],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
  ],
})
export class HttpModule {}
