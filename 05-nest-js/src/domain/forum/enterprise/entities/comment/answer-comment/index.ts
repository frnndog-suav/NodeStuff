import { Optional } from '@/core/types/optional'
import { Comment, TCommentProps } from '..'
import { UniqueEntityID } from '../../value-objects/unique-entity-id'

export type TAnswerCommentProps = TCommentProps & {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<TAnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<TAnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return answerComment
  }
}
