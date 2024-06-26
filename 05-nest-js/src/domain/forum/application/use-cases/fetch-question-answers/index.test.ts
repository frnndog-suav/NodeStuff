import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from '.'
import { InMemoryAnswersAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswersAttachmentRepository
let useCase: FetchQuestionAnswersUseCase

describe('[Use Case] - Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswersAttachmentRepository()
    inMemoryRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    useCase = new FetchQuestionAnswersUseCase(inMemoryRepository)
  })

  it('it should be able to fetch question answers', async () => {
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )

    const result = await useCase.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('it should be able to fetch paginated question answers', async () => {
    for (let index = 0; index < 22; index++) {
      await inMemoryRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await useCase.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
