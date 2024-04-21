import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from '.'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let checkInUseCase: CheckInUseCase

describe('CheckInUseCase', () => {
    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        checkInUseCase = new CheckInUseCase(inMemoryCheckInsRepository)
    })

    it('should be able to check in', async () => {
        const { checkIn } = await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        expect(checkIn.id).toStrictEqual(expect.any(String))
    })
})
