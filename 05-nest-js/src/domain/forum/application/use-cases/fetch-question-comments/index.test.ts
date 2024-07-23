import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-questions-comment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { FetchQuestionCommentsUseCase } from '.'

let inMemoryRepository: InMemoryQuestionsCommentRepository
let useCase: FetchQuestionCommentsUseCase
let inMemoryStudentsRepository: InMemoryStudentsRepository

describe('[Use Case] - Fetch question comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryRepository = new InMemoryQuestionsCommentRepository(
      inMemoryStudentsRepository,
    )
    useCase = new FetchQuestionCommentsUseCase(inMemoryRepository)
  })

  it('it should be able to fetch question comments', async () => {
    const student = makeStudent({ name: 'Test' })

    inMemoryStudentsRepository.items.push(student)

    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    await inMemoryRepository.create(comment1)
    await inMemoryRepository.create(comment2)
    await inMemoryRepository.create(comment3)

    const result = await useCase.execute({
      questionId: 'question-1',
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

  it('it should be able to fetch paginated question comments', async () => {
    const student = makeStudent({ name: 'Test' })

    inMemoryStudentsRepository.items.push(student)

    for (let index = 0; index < 22; index++) {
      await inMemoryRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await useCase.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
