import { authenticateController } from '@/http/controllers/users/authenticate'
import { profileController } from '@/http/controllers/users/profile'
import { registerUserController } from '@/http/controllers/users/register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
    /** Public routes */
    app.post('/users', registerUserController)

    app.post('/sessions', authenticateController)

    /** Authenticated routes */
    app.get(
        '/me',
        {
            onRequest: [verifyJWT],
        },
        profileController
    )
}
