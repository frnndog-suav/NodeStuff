import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { AnswersRepository } from '../../repositories/answers'
import { AnswersCommentRepository } from '../../repositories/answers-comment'

export type TCommentOnAnswerUseCaseRequest = {
    authorId: string
    answerId: string
    content: string
}

export type TCommentOnAnswerUseCaseResponse = {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
    constructor(
        private answersRepository: AnswersRepository,
        private answersCommentRepository: AnswersCommentRepository
    ) {}

    async execute({
        authorId,
        content,
        answerId,
    }: TCommentOnAnswerUseCaseRequest): Promise<TCommentOnAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found!')
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityID(authorId),
            content,
            answerId: new UniqueEntityID(answerId),
        })

        await this.answersCommentRepository.create(answerComment)

        return {
            answerComment,
        }
    }
}
