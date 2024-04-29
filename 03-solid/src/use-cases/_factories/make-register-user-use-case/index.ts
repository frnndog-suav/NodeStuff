import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { RegisterUserUseCase } from '@/use-cases/register-user'

export function makeRegisterUserUseCase() {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository)

    return registerUserUseCase
}
