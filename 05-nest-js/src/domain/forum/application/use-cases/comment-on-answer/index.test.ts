import { makeAnswer } from 'test/factories/make-answer'

import { InMemoryAnswersAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersCommentRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { CommentOnAnswerUseCase } from '.'

let inMemoryAnswersCommentRepository: InMemoryAnswersCommentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswersAttachmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let useCase: CommentOnAnswerUseCase

describe('[Use Case] - Comment on answer', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    inMemoryAnswersCommentRepository = new InMemoryAnswersCommentRepository(
      inMemoryStudentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswersAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    useCase = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersCommentRepository,
    )
  })

  it('it should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await useCase.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Test comment',
    })

    expect(inMemoryAnswersCommentRepository.items[0].content).toStrictEqual(
      'Test comment',
    )
  })
})
