import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '../../value-objects/unique-entity-id'
import { Comment, TCommentProps } from '../index'

export type TQuestionCommentProps = TCommentProps & {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<TQuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<TQuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return questionComment
  }
}
