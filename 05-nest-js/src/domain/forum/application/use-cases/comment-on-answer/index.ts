import { Either, left, right } from '@/core/error/either'
import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { AnswersRepository } from '../../repositories/answers'
import { AnswersCommentRepository } from '../../repositories/answers-comment'
import { ResourceNotFoundError } from '../_errors/resource-not-found'

export type TCommentOnAnswerUseCaseRequest = {
  authorId: string
  answerId: string
  content: string
}

export type TCommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

@Injectable()
export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentRepository: AnswersCommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: TCommentOnAnswerUseCaseRequest): Promise<TCommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      answerId: new UniqueEntityID(answerId),
    })

    await this.answersCommentRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
