import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/attachment/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswersAttachmentsRepository
  implements AnswerAttachmentRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
