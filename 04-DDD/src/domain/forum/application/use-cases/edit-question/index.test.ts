import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from '.'
import { NotAllowedError } from '../_errors/not-allowed-error'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: EditQuestionUseCase

describe('[Use Case] - Edit question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionsRepository()
        useCase = new EditQuestionUseCase(inMemoryRepository)
    })

    it('it should be able to edit a question', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID('author-1'),
            },
            new UniqueEntityID('question-1')
        )

        inMemoryRepository.create(newQuestion)

        await useCase.execute({
            authorId: 'author-1',
            title: 'Test question',
            content: 'Test content',
            questionId: newQuestion.id.toValue(),
        })

        expect(inMemoryRepository.items[0]).toMatchObject({
            title: 'Test question',
            content: 'Test content',
        })
    })

    it('it should not be able to edit a question from another author', async () => {
        const newQuestion = makeQuestion(
            {
                authorId: new UniqueEntityID('author-2'),
            },
            new UniqueEntityID('question-1')
        )

        inMemoryRepository.create(newQuestion)

        const result = await useCase.execute({
            authorId: 'another-author',
            title: 'Test question',
            content: 'Test content',
            questionId: newQuestion.id.toValue(),
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
