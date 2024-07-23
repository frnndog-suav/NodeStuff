import { Either, right } from '@/core/error/either'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { Injectable } from '@nestjs/common'
import { AnswersCommentRepository } from '../../repositories/answers-comment'

export type TFetchAnswerCommentsUseCaseRequest = {
  page: number
  answerId: string
}

export type TFetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answersCommentRepository: AnswersCommentRepository) {}

  async execute({
    page,
    answerId,
  }: TFetchAnswerCommentsUseCaseRequest): Promise<TFetchAnswerCommentsUseCaseResponse> {
    const comments =
      await this.answersCommentRepository.findManyByAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return right({
      comments,
    })
  }
}
