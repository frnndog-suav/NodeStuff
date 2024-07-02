import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comment'
import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'
import { PrismaService } from '../prisma.service'

const ITEMS_PER_PAGE = 20

@Injectable()
export class PrismaAnswersCommentsRepository
  implements AnswersCommentRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)

    await this.prisma.comment.create({
      data,
    })
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!answerComment) {
      return null
    }

    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answerComment.id.toString(),
      },
    })
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const answerComments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    })

    return answerComments.map((answer) => {
      return PrismaAnswerCommentMapper.toDomain(answer)
    })
  }
}
