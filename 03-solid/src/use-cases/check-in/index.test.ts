import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '.'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let checkInUseCase: CheckInUseCase

describe('CheckInUseCase', () => {
    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        checkInUseCase = new CheckInUseCase(inMemoryCheckInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        vi.setSystemTime(new Date(1997, 9, 28, 8, 0, 0))

        const { checkIn } = await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        expect(checkIn.id).toStrictEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(1997, 9, 28, 8, 0, 0))

        await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        await expect(() =>
            checkInUseCase.execute({
                userId: 'user-id',
                gymId: 'gym-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should be able to check in twice bu in different days', async () => {
        vi.setSystemTime(new Date(1997, 9, 28, 8, 0, 0))

        await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        vi.setSystemTime(new Date(1997, 9, 29, 8, 0, 0))

        const { checkIn } = await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
        })

        expect(checkIn.id).toStrictEqual(expect.any(String))
    })
})
