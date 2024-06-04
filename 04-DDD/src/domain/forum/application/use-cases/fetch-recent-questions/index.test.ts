import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from '.'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: FetchRecentQuestionsUseCase

describe('[Use Case] - Fetch recent questions', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionsRepository()
        useCase = new FetchRecentQuestionsUseCase(inMemoryRepository)
    })

    it('it should be able to fetch recent questions', async () => {
        await inMemoryRepository.create(
            makeQuestion({ createdAt: new Date(2022, 0, 20) })
        )
        await inMemoryRepository.create(
            makeQuestion({ createdAt: new Date(2022, 0, 18) })
        )
        await inMemoryRepository.create(
            makeQuestion({ createdAt: new Date(2022, 0, 23) })
        )

        const { questions } = await useCase.execute({
            page: 1,
        })

        expect(questions).toStrictEqual([
            expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
        ])
    })

    it('it should be able to fetch paginated recent questions', async () => {
        for (let index = 0; index < 22; index++) {
            await inMemoryRepository.create(makeQuestion())
        }

        const { questions } = await useCase.execute({
            page: 2,
        })

        expect(questions).toHaveLength(2)
    })
})