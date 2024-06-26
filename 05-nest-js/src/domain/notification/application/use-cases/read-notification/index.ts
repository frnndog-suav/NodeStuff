import { Either, left, right } from '@/core/error/either'

import { NotAllowedError } from '@/domain/forum/application/use-cases/_errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/_errors/resource-not-found'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '../../repositories/notification'

export type TReadNotificationUseCaseRequest = {
  notificationId: string
  recipientId: string
}

export type TReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: TReadNotificationUseCaseRequest): Promise<TReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
