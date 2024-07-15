import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { InMemoryQuestionsAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from '.'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentRepository: InMemoryQuestionsAttachmentRepository
let useCase: CreateQuestionUseCase

describe('[Use Case] - Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentRepository =
      new InMemoryQuestionsAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentRepository
    )
    useCase = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await useCase.execute({
      authorId: '1',
      content: 'content',
      title: 'title',
      attachmentsId: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0].id).toStrictEqual(
      result.value?.question.id
    )
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })

  it('should persist attachments when creating a new question', async () => {
    const result = await useCase.execute({
      authorId: '1',
      content: 'content',
      title: 'title',
      attachmentsId: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsAttachmentRepository.items).toHaveLength(2)
    expect(inMemoryQuestionsAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ])
    )
  })
})
