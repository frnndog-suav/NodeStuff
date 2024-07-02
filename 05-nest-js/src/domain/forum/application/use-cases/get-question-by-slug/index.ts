import { Either, left, right } from '@/core/error/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { QuestionsRepository } from '../../repositories/questions'
import { ResourceNotFoundError } from '../_errors/resource-not-found'

export type TGetQuestionBySlugUseCaseRequest = {
  slug: string
}

export type TGetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: TGetQuestionBySlugUseCaseRequest): Promise<TGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
