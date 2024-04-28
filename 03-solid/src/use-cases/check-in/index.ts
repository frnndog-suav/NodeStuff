import { CheckInstRepository } from '@/repositories/check-ins-repository-interface'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinates'

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
            throw new Error()
        }

        const checkInOnSameDay =
            await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new ResourceNotFoundError()
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
