import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from '.'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let useCase: SendNotificationUseCase

describe('[Use Case] - Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    useCase = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await useCase.execute({
      recipientId: '1',
      content: 'content',
      title: 'title',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].id).toStrictEqual(
      result.value?.notification.id,
    )
  })
})
