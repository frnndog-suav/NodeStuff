import {
  Student,
  TStudentProps,
} from '@/domain/forum/enterprise/entities/student'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

import { faker } from '@faker-js/faker'

export function makeStudent(
  override: Partial<TStudentProps> = {},
  id?: UniqueEntityID
) {
  return Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  )
}
