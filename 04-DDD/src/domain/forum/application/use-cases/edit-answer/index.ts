import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../../repositories/answers'

export type TEditAnswerUseCaseRequest = {
    authorId: string
    content: string
    answerId: string
}

export type TEditAnswerUseCaseResponse = {
    answer: Answer
}

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({
        authorId,
        content,
        answerId,
    }: TEditAnswerUseCaseRequest): Promise<TEditAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Question not found.')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed')
        }

        answer.content = content

        await this.answersRepository.save(answer)

        return {
            answer,
        }
    }
}
