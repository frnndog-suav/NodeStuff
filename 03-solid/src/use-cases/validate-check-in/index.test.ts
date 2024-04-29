import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInUseCase } from '.'
import { LateCheckInValidationError } from '../_errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('ValidateCheckInUseCase', () => {
    beforeEach(async () => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
        validateCheckInUseCase = new ValidateCheckInUseCase(
            inMemoryCheckInsRepository
        )

        // await inMemoryGymsRepository.create({
        //     id: 'gym-id',
        //     title: 'Nome da academia',
        //     description: '',
        //     phone: '',
        //     latitude: 0,
        //     longitude: 0,
        // })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await inMemoryCheckInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const { checkIn } = await validateCheckInUseCase.execute({
            checkInId: createdCheckIn.id,
        })

        expect(checkIn.validated_at).toStrictEqual(expect.any(Date))
        expect(inMemoryCheckInsRepository.items[0].validated_at).toStrictEqual(
            expect.any(Date)
        )
    })

    it('should be not able to validate an inexistent check-in', async () => {
        await expect(() =>
            validateCheckInUseCase.execute({
                checkInId: 'inexistent-check-in-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to validate check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2024, 3, 28, 13, 40))

        const createdCheckIn = await inMemoryCheckInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const TWENTY_ONE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 21

        vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MILLISECONDS)

        await expect(() =>
            validateCheckInUseCase.execute({
                checkInId: createdCheckIn.id,
            })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })
})
