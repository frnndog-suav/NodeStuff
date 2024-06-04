import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-questions-comment-repository'
import { DeleteCommentOnQuestionUseCase } from '.'

let inMemoryQuestionsCommentRepository: InMemoryQuestionsCommentRepository
let useCase: DeleteCommentOnQuestionUseCase

describe('[Use Case] - Delete on question', () => {
    beforeEach(() => {
        inMemoryQuestionsCommentRepository =
            new InMemoryQuestionsCommentRepository()
        useCase = new DeleteCommentOnQuestionUseCase(
            inMemoryQuestionsCommentRepository
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

        await expect(() => {
            return useCase.execute({
                questionCommentId: questionComment.id.toString(),
                authorId: 'author-2',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
