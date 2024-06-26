import { Answer, TAnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<TAnswerProps> = {},
  id?: UniqueEntityID,
) {
  return Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
