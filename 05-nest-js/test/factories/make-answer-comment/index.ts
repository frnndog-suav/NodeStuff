import {
  AnswerComment,
  TAnswerCommentProps,
} from '@/domain/forum/enterprise/entities/comment/answer-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<TAnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  return AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
