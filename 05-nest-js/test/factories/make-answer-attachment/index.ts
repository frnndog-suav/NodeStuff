import {
  AnswerAttachment,
  TAnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/attachment/answer-attachment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

export function makeAnswerAttachment(
  override: Partial<TAnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  return AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
