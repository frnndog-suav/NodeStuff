import { QuestionComment } from '@/domain/forum/enterprise/entities/comment/question-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { QuestionsRepository } from '../../repositories/questions'
import { QuestionsCommentRepository } from '../../repositories/questions-comment'

export type TCommentOnQuestionUseCaseRequest = {
    authorId: string
    questionId: string
    content: string
}

export type TCommentOnQuestionUseCaseResponse = {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private questionsCommentRepository: QuestionsCommentRepository
    ) {}

    async execute({
        authorId,
        content,
        questionId,
    }: TCommentOnQuestionUseCaseRequest): Promise<TCommentOnQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found!')
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            content,
            questionId: new UniqueEntityID(questionId),
        })

        await this.questionsCommentRepository.create(questionComment)

        return {
            questionComment,
        }
    }
}
