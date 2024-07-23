import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-questions-comment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { DeleteCommentOnQuestionUseCase } from '.'
import { NotAllowedError } from '../_errors/not-allowed-error'

let inMemoryQuestionsCommentRepository: InMemoryQuestionsCommentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let useCase: DeleteCommentOnQuestionUseCase

describe('[Use Case] - Delete on question', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    inMemoryQuestionsCommentRepository = new InMemoryQuestionsCommentRepository(
      inMemoryStudentsRepository,
    )
    useCase = new DeleteCommentOnQuestionUseCase(
      inMemoryQuestionsCommentRepository,
    )
  })

  it('it should be able to comment on question', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionsCommentRepository.create(questionComment)

    await useCase.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionsCommentRepository.items).toHaveLength(0)
  })

  it('it should be able to delete another question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionsCommentRepository.create(questionComment)

    const result = await useCase.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
