import { Entity } from '@/core/entities'
import { UniqueEntityID } from '../../value-objects/unique-entity-id'

export type TQuestionAttachmentProps = {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class QuestionAttachment extends Entity<TQuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: TQuestionAttachmentProps, id?: UniqueEntityID) {
    const attachment = new QuestionAttachment(props, id)

    return attachment
  }
}
