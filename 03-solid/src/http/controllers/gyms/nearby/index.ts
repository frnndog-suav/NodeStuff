import { makeFetchNearByGymsUseCase } from '@/use-cases/_factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearbyGymsController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyGymsUseCase = makeFetchNearByGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude,
    })

    return reply.status(200).send({ gyms })
}
