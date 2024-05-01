import { InvalidCredentialsError } from '@/use-cases/_errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/_factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            }
        )

        return reply.status(200).send({
            token,
        })
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({
                message: error.message,
            })
        }

        throw error
    }

    return reply.status(200).send()
}