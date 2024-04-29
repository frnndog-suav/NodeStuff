import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { CheckInUseCase } from '@/use-cases/check-in'

export function makeCheckInUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const prismaGymsRepository = new PrismaGymsRepository()
    const useCase = new CheckInUseCase(
        prismaCheckInsRepository,
        prismaGymsRepository
    )

    return useCase
}
