import { QuestionsCommentRepository } from '../../repositories/questions-comment'

export type TDeleteCommentOnQuestionUseCaseRequest = {
    authorId: string
    questionCommentId: string
}

export type TDeleteCommentOnQuestionUseCaseResponse = {}

export class DeleteCommentOnQuestionUseCase {
    constructor(
        private questionsCommentRepository: QuestionsCommentRepository
    ) {}

    async execute({
        authorId,
        questionCommentId,
    }: TDeleteCommentOnQuestionUseCaseRequest): Promise<TDeleteCommentOnQuestionUseCaseResponse> {
        const questionComment =
            await this.questionsCommentRepository.findById(questionCommentId)

        if (!questionComment) {
            throw new Error('Question not found!')
        }

        if (questionComment.authorId.toString() !== authorId) {
            throw new Error('Not allowed!')
        }

        await this.questionsCommentRepository.delete(questionComment)

        return {}
    }
}
