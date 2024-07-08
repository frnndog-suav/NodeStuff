import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CommentPresenter } from '../../presenters/comment-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(
    private fetchQuestionCommentsUseCase: FetchQuestionCommentsUseCase
  ) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string
  ) {
    const result = await this.fetchQuestionCommentsUseCase.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questionComments = result.value.questionComments

    return {
      comments: questionComments.map((comment) =>
        CommentPresenter.toHttp(comment)
      ),
    }
  }
}
