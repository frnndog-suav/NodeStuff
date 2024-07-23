import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryAnswersCommentRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { FetchAnswerCommentsUseCase } from '.'

let inMemoryRepository: InMemoryAnswersCommentRepository
let useCase: FetchAnswerCommentsUseCase
let inMemoryStudentsRepository: InMemoryStudentsRepository

describe('[Use Case] - Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryRepository = new InMemoryAnswersCommentRepository(
      inMemoryStudentsRepository,
    )
    useCase = new FetchAnswerCommentsUseCase(inMemoryRepository)
  })

  it('it should be able to fetch answer comments', async () => {
    const student = makeStudent({ name: 'Test' })

    inMemoryStudentsRepository.items.push(student)

    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id,
    })

    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id,
    })

    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id,
    })

    await inMemoryRepository.create(comment1)
    await inMemoryRepository.create(comment2)
    await inMemoryRepository.create(comment3)

    const result = await useCase.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authorName: 'Test',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          authorName: 'Test',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          authorName: 'Test',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('it should be able to fetch paginated answer comments', async () => {
    const student = makeStudent({ name: 'Test' })

    inMemoryStudentsRepository.items.push(student)

    for (let index = 0; index < 22; index++) {
      await inMemoryRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await useCase.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
