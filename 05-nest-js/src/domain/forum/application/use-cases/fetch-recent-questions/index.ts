import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions'
import { Either, right } from '@/core/error/either'
import { Injectable } from '@nestjs/common'

export type TFetchRecentQuestionsUseCaseRequest = {
  page: number
}

export type TFetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: TFetchRecentQuestionsUseCaseRequest): Promise<TFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
    })

    return right({
      questions,
    })
  }
}
