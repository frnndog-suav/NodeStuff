import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { RegisterUserUseCase } from '@/use-cases/registerUser'

export function makeRegisterUserUseCase() {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository)

    return registerUserUseCase
}
