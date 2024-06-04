import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-questions-comment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from '.'

let inMemoryQuestionsCommentRepository: InMemoryQuestionsCommentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let useCase: CommentOnQuestionUseCase

describe('[Use Case] - Comment on question', () => {
    beforeEach(() => {
        inMemoryQuestionsCommentRepository =
            new InMemoryQuestionsCommentRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        useCase = new CommentOnQuestionUseCase(
            inMemoryQuestionsRepository,
            inMemoryQuestionsCommentRepository
        )
    })

    it('it should be able to comment on question', async () => {
        const question = makeQuestion()

        await inMemoryQuestionsRepository.create(question)

        await useCase.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
            content: 'Test comment',
        })

        expect(
            inMemoryQuestionsCommentRepository.items[0].content
        ).toStrictEqual('Test comment')
    })
})
