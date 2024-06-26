import { Either, right } from '@/core/error/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../../repositories/answers'

export type TFetchQuestionAnswersUseCaseRequest = {
  page: number
  questionId: string
}

export type TFetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: TFetchQuestionAnswersUseCaseRequest): Promise<TFetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByAnswerId(
      questionId,
      {
        page,
      },
    )

    return right({
      answers,
    })
  }
}
