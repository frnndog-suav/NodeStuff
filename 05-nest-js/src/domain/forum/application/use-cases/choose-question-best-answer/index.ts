import { Either, left, right } from '@/core/error/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { AnswersRepository } from '../../repositories/answers'
import { QuestionsRepository } from '../../repositories/questions'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found'
import { Injectable } from '@nestjs/common'

export type TChooseAnswerBestAnswerUseCaseRequest = {
  authorId: string
  answerId: string
}

export type TChooseAnswerBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

@Injectable()
export class ChooseAnswerBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: TChooseAnswerBestAnswerUseCaseRequest): Promise<TChooseAnswerBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerID = answer.id

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
