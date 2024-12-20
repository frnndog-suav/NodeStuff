import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/_factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function checkInsHistoryController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const checkInsHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInsHistoryQuerySchema.parse(request.query)

    const fetchUserCheckInsHistoryUseCase =
        makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
        page,
        userId: request.user.sub,
    })

    return reply.status(200).send({ checkIns })
}
