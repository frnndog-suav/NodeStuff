import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms'

export function makeFetchNearByGymsUseCase() {
    const prismaGymsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository)

    return useCase
}
