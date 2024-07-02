import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/attachment/question-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionsAttachmentsRepository
  implements QuestionAttachmentRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    })

    return questionAttachments.map((attachment) =>
      PrismaQuestionAttachmentMapper.toDomain(attachment)
    )
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    })
  }
}
