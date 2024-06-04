import { QuestionComment } from '@/domain/forum/enterprise/entities/comment/question-comment'

export interface QuestionsCommentRepository {
    create(questionComment: QuestionComment): Promise<void>
    findById(id: string): Promise<QuestionComment | null>
    delete(questionComment: QuestionComment): Promise<void>
}
