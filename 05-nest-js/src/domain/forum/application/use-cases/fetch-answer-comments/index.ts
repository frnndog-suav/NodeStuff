import { Either, right } from '@/core/error/either'
import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'
import { Injectable } from '@nestjs/common'
import { AnswersCommentRepository } from '../../repositories/answers-comment'

export type TFetchAnswerCommentsUseCaseRequest = {
  page: number
  answerId: string
}

export type TFetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answersCommentRepository: AnswersCommentRepository) {}

  async execute({
    page,
    answerId,
  }: TFetchAnswerCommentsUseCaseRequest): Promise<TFetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answersCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
