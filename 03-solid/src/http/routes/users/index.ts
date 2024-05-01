import { authenticateController } from '@/http/controllers/users/authenticate'
import { profileController } from '@/http/controllers/users/profile'
import { refreshTokenController } from '@/http/controllers/users/refresh'
import { registerUserController } from '@/http/controllers/users/register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
    /** Public routes */
    app.post('/users', registerUserController)

    app.post('/sessions', authenticateController)

    app.patch('/token/refresh', refreshTokenController)

    /** Authenticated routes */
    app.get(
        '/me',
        {
            onRequest: [verifyJWT],
        },
        profileController
    )
}
