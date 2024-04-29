import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '@/use-cases/fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(
        prismaCheckInsRepository
    )

    return useCase
}
