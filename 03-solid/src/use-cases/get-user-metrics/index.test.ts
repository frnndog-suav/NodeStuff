import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from '.'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('GetUserMetricsUseCase', () => {
    beforeEach(async () => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        getUserMetricsUseCase = new GetUserMetricsUseCase(
            inMemoryCheckInsRepository
        )
    })

    it('should be able to get user check-ins count from metrics', async () => {
        await inMemoryCheckInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await inMemoryCheckInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkInsCount } = await getUserMetricsUseCase.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toStrictEqual(2)
    })
})
