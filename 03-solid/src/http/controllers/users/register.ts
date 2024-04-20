import { registerUserUseCase } from '@/http/use-cases/registerUser'
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
        await registerUserUseCase({
            email,
            name,
            password,
        })
    } catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}
