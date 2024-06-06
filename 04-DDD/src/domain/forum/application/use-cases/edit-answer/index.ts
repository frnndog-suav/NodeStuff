import { Either, left, right } from '@/core/error/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../../repositories/answers'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found'

export type TEditAnswerUseCaseRequest = {
    authorId: string
    content: string
    answerId: string
}

export type TEditAnswerUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        answer: Answer
    }
>

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({
        authorId,
        content,
        answerId,
    }: TEditAnswerUseCaseRequest): Promise<TEditAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError())
        }

        answer.content = content

        await this.answersRepository.save(answer)

        return right({
            answer,
        })
    }
}
