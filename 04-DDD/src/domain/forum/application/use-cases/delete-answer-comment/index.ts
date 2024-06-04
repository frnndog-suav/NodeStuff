import { AnswersCommentRepository } from '../../repositories/answers-comment'

export type TDeleteCommentOnAnswerUseCaseRequest = {
    authorId: string
    answerCommentId: string
}

export type TDeleteCommentOnAnswerUseCaseResponse = {}

export class DeleteCommentOnAnswerUseCase {
    constructor(private answersCommentRepository: AnswersCommentRepository) {}

    async execute({
        authorId,
        answerCommentId,
    }: TDeleteCommentOnAnswerUseCaseRequest): Promise<TDeleteCommentOnAnswerUseCaseResponse> {
        const answerComment =
            await this.answersCommentRepository.findById(answerCommentId)

        if (!answerComment) {
            throw new Error('Answer not found!')
        }

        if (answerComment.authorId.toString() !== authorId) {
            throw new Error('Not allowed!')
        }

        await this.answersCommentRepository.delete(answerComment)

        return {}
    }
}
