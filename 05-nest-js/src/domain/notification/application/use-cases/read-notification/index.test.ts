import { NotAllowedError } from '@/domain/forum/application/use-cases/_errors/not-allowed-error'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from '.'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let useCase: ReadNotificationUseCase

describe('[Use Case] - Read notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    useCase = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await useCase.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('it should not be able to delete a notification from another author', async () => {
    const newNotification = makeNotification({
      recipientId: new UniqueEntityID('author-2'),
    })

    inMemoryNotificationsRepository.create(newNotification)

    const result = await useCase.execute({
      notificationId: newNotification.id.toString(),
      recipientId: 'author-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
