import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from '.'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase

describe('FetchUserCheckInsHistoryUseCase', () => {
    beforeEach(async () => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
            inMemoryCheckInsRepository
        )
    })

    it('should be able to fetch check-in history', async () => {
        await inMemoryCheckInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await inMemoryCheckInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
            userId: 'user-01',
            page: 1,
        })

        expect(checkIns.length).toStrictEqual(2)
        expect(checkIns).toStrictEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' }),
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let index = 0; index < 22; index++) {
            await inMemoryCheckInsRepository.create({
                gym_id: `gym-${index}`,
                user_id: 'user-01',
            })
        }

        const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
            userId: 'user-01',
            page: 2,
        })

        expect(checkIns.length).toStrictEqual(2)
        expect(checkIns).toStrictEqual([
            expect.objectContaining({ gym_id: 'gym-20' }),
            expect.objectContaining({ gym_id: 'gym-21' }),
        ])
    })
})
