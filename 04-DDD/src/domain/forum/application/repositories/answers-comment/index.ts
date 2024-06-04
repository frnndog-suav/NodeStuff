import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'

export interface AnswersCommentRepository {
    create(answerComment: AnswerComment): Promise<void>
    findById(id: string): Promise<AnswerComment | null>
    delete(answerComment: AnswerComment): Promise<void>
}
