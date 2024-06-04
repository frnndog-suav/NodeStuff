import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions'

export type TGetQuestionBySlugUseCaseRequest = {
    slug: string
}

export type TGetQuestionBySlugUseCaseResponse = {
    question: Question
}

export class GetQuestionBySlugUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({
        slug,
    }: TGetQuestionBySlugUseCaseRequest): Promise<TGetQuestionBySlugUseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found')
        }

        return {
            question,
        }
    }
}
