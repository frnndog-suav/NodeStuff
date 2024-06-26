import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-questions-comment-repository'
import { FetchQuestionCommentsUseCase } from '.'

let inMemoryRepository: InMemoryQuestionsCommentRepository
let useCase: FetchQuestionCommentsUseCase

describe('[Use Case] - Fetch question comments', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsCommentRepository()
    useCase = new FetchQuestionCommentsUseCase(inMemoryRepository)
  })

  it('it should be able to fetch question comments', async () => {
    await inMemoryRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const result = await useCase.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('it should be able to fetch paginated question comments', async () => {
    for (let index = 0; index < 22; index++) {
      await inMemoryRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const result = await useCase.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
