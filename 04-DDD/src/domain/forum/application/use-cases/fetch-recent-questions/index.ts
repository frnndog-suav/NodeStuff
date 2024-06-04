import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions'

export type TFetchRecentQuestionsUseCaseRequest = {
    page: number
}

export type TFetchRecentQuestionsUseCaseResponse = {
    questions: Question[]
}

export class FetchRecentQuestionsUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({
        page,
    }: TFetchRecentQuestionsUseCaseRequest): Promise<TFetchRecentQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({
            page,
        })

        return {
            questions,
        }
    }
}
