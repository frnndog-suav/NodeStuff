import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export function makeAuthenticateUseCase() {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUserUseCase = new AuthenticateUseCase(prismaUserRepository)

    return registerUserUseCase
}
