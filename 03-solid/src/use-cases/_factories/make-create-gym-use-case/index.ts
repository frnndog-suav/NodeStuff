import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym'

export function makeCreateGymUseCase() {
    const prismaGymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(prismaGymsRepository)

    return useCase
}
