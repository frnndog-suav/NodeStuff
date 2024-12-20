import { UserAlreadyExistsError } from '@/use-cases/_errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/_factories/make-register-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUserController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerUserUseCase = makeRegisterUserUseCase()

        await registerUserUseCase.execute({
            email,
            name,
            password,
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message,
            })
        }

        throw error
    }

    return reply.status(201).send()
}
