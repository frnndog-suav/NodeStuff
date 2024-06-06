import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from '.'
import { NotAllowedError } from '../_errors/not-allowed-error'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: DeleteQuestionUseCase

describe('[Use Case] - Delete question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionsRepository()
        useCase = new DeleteQuestionUseCase(inMemoryRepository)
    })

    it('it should be able to delete a question', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID('author-1'),
            },
            new UniqueEntityID('question-1')
        )

        inMemoryRepository.create(newQuestion)

        await useCase.execute({
            questionId: 'question-1',
            authorId: 'author-1',
        })

        expect(inMemoryRepository.items).toHaveLength(0)
    })

    it('it should not be able to delete a question from another author', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID('author-2'),
            },
            new UniqueEntityID('question-1')
        )

        inMemoryRepository.create(newQuestion)

        const result = await useCase.execute({
            questionId: 'question-1',
            authorId: 'author-1',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
