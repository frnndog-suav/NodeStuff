import { prisma } from '@/lib/prisma/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'

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

    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userWithSameEmail) {
        return reply.status(409).send()
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: passwordHash,
        },
    })

    return reply.status(201).send()
}
