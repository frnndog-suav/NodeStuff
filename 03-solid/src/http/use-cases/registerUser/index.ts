import { prisma } from '@/lib/prisma/prisma'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseParams {
    name: string
    email: string
    password: string
}

export async function registerUserUseCase({
    email,
    name,
    password,
}: RegisterUserUseCaseParams) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userWithSameEmail) {
        throw new Error("Email already exists!")
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: passwordHash,
        },
    })
}
