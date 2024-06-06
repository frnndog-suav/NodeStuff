import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from '.'
import { NotAllowedError } from '../_errors/not-allowed-error'

let inMemoryRepository: InMemoryAnswersRepository
let useCase: EditAnswerUseCase

describe('[Use Case] - Edit answer', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswersRepository()
        useCase = new EditAnswerUseCase(inMemoryRepository)
    })

    it('it should be able to edit a answer', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID('author-1'),
            },
            new UniqueEntityID('answer-1')
        )

        inMemoryRepository.create(newAnswer)

        await useCase.execute({
            authorId: 'author-1',
            content: 'Test content',
            answerId: newAnswer.id.toValue(),
        })

        expect(inMemoryRepository.items[0]).toMatchObject({
            content: 'Test content',
        })
    })

    it('it should not be able to edit a answer from another author', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID('author-2'),
            },
            new UniqueEntityID('answer-1')
        )

        inMemoryRepository.create(newAnswer)

        const result = await useCase.execute({
            authorId: 'another-author',
            content: 'Test content',
            answerId: newAnswer.id.toValue(),
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
