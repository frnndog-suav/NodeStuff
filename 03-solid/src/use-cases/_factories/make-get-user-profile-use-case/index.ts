import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'

export function makeGetUserProfileUseCase() {
    const prismaUserRepository = new PrismaUserRepository()
    const useCase = new GetUserProfileUseCase(prismaUserRepository)

    return useCase
}
