import { makeSearchGymsUseCase } from '@/use-cases/_factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchGymController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const searchGymsQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { page, q } = searchGymsQuerySchema.parse(request.query)

    const searchGymsUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
        page,
        query: q,
    })

    return reply.status(201).send({ gyms })
}
