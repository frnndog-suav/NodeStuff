import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import {
  Notification,
  TNotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<TNotificationProps> = {},
  id?: UniqueEntityID,
) {
  return Notification.create(
    {
      title: faker.lorem.sentence(),
      recipientId: new UniqueEntityID(),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )
}
