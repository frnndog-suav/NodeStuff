import { Either, left, right } from '@/core/error/either'
import { AnswersCommentRepository } from '../../repositories/answers-comment'
import { ResourceNotFoundError } from '../_errors/resource-not-found'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

export type TDeleteCommentOnAnswerUseCaseRequest = {
  authorId: string
  answerCommentId: string
}

export type TDeleteCommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteCommentOnAnswerUseCase {
  constructor(private answersCommentRepository: AnswersCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: TDeleteCommentOnAnswerUseCaseRequest): Promise<TDeleteCommentOnAnswerUseCaseResponse> {
    const answerComment =
      await this.answersCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answersCommentRepository.delete(answerComment)

    return right(null)
  }
}
