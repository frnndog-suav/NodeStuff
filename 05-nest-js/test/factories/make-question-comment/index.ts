import {
  QuestionComment,
  TQuestionCommentProps,
} from '@/domain/forum/enterprise/entities/comment/question-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override: Partial<TQuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  return QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
