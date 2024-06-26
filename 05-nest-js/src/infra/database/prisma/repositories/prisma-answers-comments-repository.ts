import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comment'
import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswersCommentsRepository
  implements AnswersCommentRepository
{
  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }
}
