import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionMapper } from '../mappers/prisma-questions-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(question: Question): Promise<void> {}

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }
}
