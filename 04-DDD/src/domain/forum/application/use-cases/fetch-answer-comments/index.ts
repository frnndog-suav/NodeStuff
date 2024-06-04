import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'
import { AnswersCommentRepository } from '../../repositories/answers-comment'

export type TFetchAnswerCommentsUseCaseRequest = {
    page: number
    answerId: string
}

export type TFetchAnswerCommentsUseCaseResponse = {
    answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
    constructor(private answersCommentRepository: AnswersCommentRepository) {}

    async execute({
        page,
        answerId,
    }: TFetchAnswerCommentsUseCaseRequest): Promise<TFetchAnswerCommentsUseCaseResponse> {
        const answerComments =
            await this.answersCommentRepository.findManyByAnswerId(answerId, {
                page,
            })

        return {
            answerComments,
        }
    }
}
