import { createGymController } from '@/http/controllers/gyms/create'
import { nearbyGymsController } from '@/http/controllers/gyms/nearby'
import { searchGymController } from '@/http/controllers/gyms/search'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', searchGymController)

    app.get('/gyms/nearby', nearbyGymsController)

    app.post(
        '/gyms',
        {
            onRequest: [verifyUserRole('ADMIN')],
        },
        createGymController
    )
}
