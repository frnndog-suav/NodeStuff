import { Either, left, right } from '@/core/error/either'
import { AnswersCommentRepository } from '../../repositories/answers-comment'

export type TDeleteCommentOnAnswerUseCaseRequest = {
    authorId: string
    answerCommentId: string
}

export type TDeleteCommentOnAnswerUseCaseResponse = Either<string, {}>

export class DeleteCommentOnAnswerUseCase {
    constructor(private answersCommentRepository: AnswersCommentRepository) {}

    async execute({
        authorId,
        answerCommentId,
    }: TDeleteCommentOnAnswerUseCaseRequest): Promise<TDeleteCommentOnAnswerUseCaseResponse> {
        const answerComment =
            await this.answersCommentRepository.findById(answerCommentId)

        if (!answerComment) {
            return left('Answer not found!')
        }

        if (answerComment.authorId.toString() !== authorId) {
            return left('Not allowed')
        }

        await this.answersCommentRepository.delete(answerComment)

        return right({})
    }
}
