import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '.'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('CheckInUseCase', () => {
    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        inMemoryGymsRepository = new InMemoryGymsRepository()
        checkInUseCase = new CheckInUseCase(
            inMemoryCheckInsRepository,
            inMemoryGymsRepository
        )

        inMemoryGymsRepository.items.push({
            id: 'gym-id',
            title: 'Nome da academia',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

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
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toStrictEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(1997, 9, 28, 8, 0, 0))

        await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() =>
            checkInUseCase.execute({
                userId: 'user-id',
                gymId: 'gym-id',
                userLatitude: 0,
                userLongitude: 0,
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(1997, 9, 28, 8, 0, 0))

        await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(1997, 9, 29, 8, 0, 0))

        const { checkIn } = await checkInUseCase.execute({
            userId: 'user-id',
            gymId: 'gym-id',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toStrictEqual(expect.any(String))
    })
})
