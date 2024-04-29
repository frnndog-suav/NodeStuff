import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics'

export function makeGetUserMetricsUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository)

    return useCase
}
