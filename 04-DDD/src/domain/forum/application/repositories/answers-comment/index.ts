import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'

export interface AnswersCommentRepository {
    create(answerComment: AnswerComment): Promise<void>
}
