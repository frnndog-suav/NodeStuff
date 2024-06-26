import {
  QuestionAttachment,
  TQuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/attachment/question-attachment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

export function makeQuestionAttachment(
  override: Partial<TQuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  return QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
