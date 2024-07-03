import { QuestionAttachment } from '@/domain/forum/enterprise/entities/attachment/question-attachment'

export abstract class QuestionAttachmentRepository {
  abstract findManyByQuestionId(
    questionId: string
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
