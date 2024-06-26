import { QuestionAttachment } from '@/domain/forum/enterprise/entities/attachment/question-attachment'

export interface QuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
