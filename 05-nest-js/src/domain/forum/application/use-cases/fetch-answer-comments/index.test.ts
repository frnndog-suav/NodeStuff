import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswersCommentRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { FetchAnswerCommentsUseCase } from '.'

let inMemoryRepository: InMemoryAnswersCommentRepository
let useCase: FetchAnswerCommentsUseCase

describe('[Use Case] - Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersCommentRepository()
    useCase = new FetchAnswerCommentsUseCase(inMemoryRepository)
  })

  it('it should be able to fetch answer comments', async () => {
    await inMemoryRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )

    const result = await useCase.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('it should be able to fetch paginated answer comments', async () => {
    for (let index = 0; index < 22; index++) {
      await inMemoryRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        }),
      )
    }

    const result = await useCase.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
