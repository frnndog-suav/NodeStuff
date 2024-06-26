import { Either, right } from '@/core/error/either'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '../../repositories/notification'

export type TSendNotificationUseCaseRequest = {
  recipientId: string
  title: string
  content: string
}

export type TSendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: TSendNotificationUseCaseRequest): Promise<TSendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
