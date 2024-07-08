import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { ChooseAnswerBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { DeleteCommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { DeleteCommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DataBaseModule } from '../database/database.module'
import { AnswerQuestionController } from './controllers/answer-question/index.controller'
import { AuthenticationController } from './controllers/authentication/index.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer/index.controller'
import { CommentOnAnswerController } from './controllers/comment-on-answer/index.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question/index.controller'
import { CreateAccountController } from './controllers/create-account/index.controller'
import { CreateQuestionController } from './controllers/create-question/index.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment/index.controller'
import { DeleteAnswerController } from './controllers/delete-answer/index.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment/index.controller'
import { DeleteQuestionController } from './controllers/delete-question/index.controller'
import { EditAnswerController } from './controllers/edit-answer/index.controller'
import { EditQuestionController } from './controllers/edit-question/index.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers/index.controller'
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
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
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
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseAnswerBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteCommentOnQuestionUseCase,
    CommentOnAnswerUseCase,
    DeleteCommentOnAnswerUseCase,
  ],
})
export class HttpModule {}
