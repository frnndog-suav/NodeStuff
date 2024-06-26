import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswersCommentRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { DeleteCommentOnAnswerUseCase } from '.'
import { NotAllowedError } from '../_errors/not-allowed-error'

let inMemoryAnswersCommentRepository: InMemoryAnswersCommentRepository
let useCase: DeleteCommentOnAnswerUseCase

describe('[Use Case] - Delete answer on comment', () => {
  beforeEach(() => {
    inMemoryAnswersCommentRepository = new InMemoryAnswersCommentRepository()
    useCase = new DeleteCommentOnAnswerUseCase(inMemoryAnswersCommentRepository)
  })

  it('it should be able to comment on answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswersCommentRepository.create(answerComment)

    await useCase.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswersCommentRepository.items).toHaveLength(0)
  })

  it('it should be able to delete another answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryAnswersCommentRepository.create(answerComment)

    const result = await useCase.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
