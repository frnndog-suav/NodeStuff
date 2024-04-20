import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { RegisterUserUseCase } from '@/use-cases/registerUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const registerBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBody.parse(request.body)

    try {
        const prismaUserRepository = new PrismaUserRepository()
        const registerUserUseCase = new RegisterUserUseCase(
            prismaUserRepository
        )

        await registerUserUseCase.execute({
            email,
            name,
            password,
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                error: error.message,
            })
        }

        return reply.status(500).send()
    }

    return reply.status(201).send()
}