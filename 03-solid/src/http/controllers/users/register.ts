import { prisma } from '@/lib/prisma/prisma'
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

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password,
        },
    })

    return reply.status(201).send()
}
