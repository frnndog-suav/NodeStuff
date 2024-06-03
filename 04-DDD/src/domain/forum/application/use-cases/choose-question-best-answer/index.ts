import { Question } from '@/domain/forum/enterprise/entities/question'
import { AnswersRepository } from '../../repositories/answers'
import { QuestionsRepository } from '../../repositories/question'

export type TChooseAnswerBestAnswerUseCaseRequest = {
    authorId: string
    answerId: string
}

export type TChooseAnswerBestAnswerUseCaseResponse = {
    question: Question
}

export class ChooseAnswerBestAnswerUseCase {
    constructor(
        private answersRepository: AnswersRepository,
        private questionsRepository: QuestionsRepository
    ) {}

    async execute({
        answerId,
        authorId,
    }: TChooseAnswerBestAnswerUseCaseRequest): Promise<TChooseAnswerBestAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        const question = await this.questionsRepository.findById(
            answer.questionId.toString()
        )

        if (!question) {
            throw new Error('Question not found.')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        question.bestAnswerID = answer.id

        await this.questionsRepository.save(question)

        return {
            question,
        }
    }
}
