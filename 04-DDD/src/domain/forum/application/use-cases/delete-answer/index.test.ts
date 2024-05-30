import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from '.'

let inMemoryRepository: InMemoryAnswersRepository
let useCase: DeleteAnswerUseCase

describe('[Use Case] - Delete answer', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswersRepository()
        useCase = new DeleteAnswerUseCase(inMemoryRepository)
    })

    it('it should be able to delete a answer', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID('author-1'),
            },
            new UniqueEntityID('answer-1')
        )

        inMemoryRepository.create(newAnswer)

        await useCase.execute({
            answerId: 'answer-1',
            authorId: 'author-1',
        })

        expect(inMemoryRepository.items).toHaveLength(0)
    })

    it('it should not be able to delete a answer from another author', async () => {
        const newAnswer = makeAnswer(
            {
                authorId: new UniqueEntityID('author-2'),
            },
            new UniqueEntityID('answer-1')
        )

        inMemoryRepository.create(newAnswer)

        await expect(() => {
            return useCase.execute({
                answerId: 'answer-1',
                authorId: 'author-1',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
