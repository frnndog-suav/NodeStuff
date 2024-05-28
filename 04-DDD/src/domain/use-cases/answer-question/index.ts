import { Answer } from '../../entities/answer'
import { AnswersRepository } from '../../repositories/answers'

export type TAnswerQuestionUseCaseRequest = {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({
        instructorId,
        questionId,
        content,
    }: TAnswerQuestionUseCaseRequest) {
        const answer = new Answer({
            authorId: instructorId,
            content,
            questionId,
        })

        await this.answersRepository.create(answer)

        return answer
    }
}
