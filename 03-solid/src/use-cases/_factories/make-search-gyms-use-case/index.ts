import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { SearchGymsUseCase } from '@/use-cases/search-gyms'

export function makeSearchGymsUseCase() {
    const prismaGymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymsUseCase(prismaGymsRepository)

    return useCase
}
