import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in'

export function makeValidateCheckInUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

    return useCase
}
