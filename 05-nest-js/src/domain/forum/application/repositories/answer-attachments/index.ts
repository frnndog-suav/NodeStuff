import { AnswerAttachment } from '@/domain/forum/enterprise/entities/attachment/answer-attachment'

export interface AnswerAttachmentRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
