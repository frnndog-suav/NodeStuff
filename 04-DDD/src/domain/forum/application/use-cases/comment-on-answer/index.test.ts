import { makeAnswer } from 'test/factories/make-answer'

import { InMemoryAnswersCommentRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from '.'

let inMemoryAnswersCommentRepository: InMemoryAnswersCommentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let useCase: CommentOnAnswerUseCase

describe('[Use Case] - Comment on answer', () => {
    beforeEach(() => {
        inMemoryAnswersCommentRepository =
            new InMemoryAnswersCommentRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        useCase = new CommentOnAnswerUseCase(
            inMemoryAnswersRepository,
            inMemoryAnswersCommentRepository
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
            'Test comment'
        )
    })
})
