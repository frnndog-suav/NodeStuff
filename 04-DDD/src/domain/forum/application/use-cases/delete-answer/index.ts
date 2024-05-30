import { AnswersRepository } from '../../repositories/answers'

export type TDeleteAnswerUseCaseRequest = {
    answerId: string
    authorId: string
}

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({
        answerId,
        authorId,
    }: TDeleteAnswerUseCaseRequest): Promise<void> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed')
        }

        await this.answersRepository.delete(answer)
    }
}
