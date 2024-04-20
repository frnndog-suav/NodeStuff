import { prisma } from '@/lib/prisma/prisma'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseParams {
    name: string
    email: string
    password: string
}

export class RegisterUserUseCase {
    constructor(private usersRepository: any) {}

    async execute({ email, name, password }: RegisterUserUseCaseParams) {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (userWithSameEmail) {
            throw new Error('Email already exists!')
        }

        await this.usersRepository.create({
            email,
            name,
            password_hash: passwordHash,
        })
    }
}
