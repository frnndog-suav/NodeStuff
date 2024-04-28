import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '.'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('CheckInUseCase', () => {
    beforeEach(async () => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        inMemoryGymsRepository = new InMemoryGymsRepository()
        checkInUseCase = new CheckInUseCase(
            inMemoryCheckInsRepository,
            inMemoryGymsRepository
        )

        await inMemoryGymsRepository.create({
            id: 'gym-id',
            title: 'Nome da academia',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
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
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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

    it('should not be able to check in on distant gym', async () => {
        inMemoryGymsRepository.items.push({
            id: 'testing-id',
            title: 'Nome da academia',
            description: '',
            phone: '',
            latitude: new Decimal(-23.4449708),
            longitude: new Decimal(-45.8948412),
        })

        await expect(() =>
            checkInUseCase.execute({
                gymId: 'testing-id',
                userId: 'user-id',
                userLatitude: -22.7429622,
                userLongitude: -44.6804006,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
