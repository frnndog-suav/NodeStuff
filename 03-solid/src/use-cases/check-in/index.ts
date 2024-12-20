import { CheckInstRepository } from '@/repositories/check-ins-repository-interface'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinates'
import { CheckIn } from '@prisma/client'
import { MaxDistanceError } from '../_errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../_errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

const MAX_KILOMETERS_DISTANCE_ALLOWED = 0.1

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInstRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinate(
            {
                latitude: userLatitude,
                longitude: userLongitude,
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            }
        )

        if (distance > MAX_KILOMETERS_DISTANCE_ALLOWED) {
            throw new MaxDistanceError()
        }

        const checkInOnSameDay =
            await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn,
        }
    }
}
