import { Answer } from '../../../enterprise/entities/answer'
import { UniqueEntityID } from '../../../enterprise/entities/value-objects/unique-entity-id'
import { AnswersRepository } from '../../repositories/answers'

export type TAnswerQuestionUseCaseRequest = {
    instructorId: string
    questionId: string
    content: string
}

export type TAnswerQuestionUseCaseResponse = {
    answer: Answer
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({
        instructorId,
        questionId,
        content,
    }: TAnswerQuestionUseCaseRequest): Promise<TAnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
        })

        await this.answersRepository.create(answer)

        return { answer }
    }
}
