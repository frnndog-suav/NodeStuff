import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '@/domain/forum/enterprise/entities/comment/question-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export abstract class QuestionCommentsRepository {
  abstract create(questionComment: QuestionComment): Promise<void>
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract delete(questionComment: QuestionComment): Promise<void>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>
}
