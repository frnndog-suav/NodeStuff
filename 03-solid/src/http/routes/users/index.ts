import { authenticateController } from '@/http/controllers/users/authenticate'
import { registerUserController } from '@/http/controllers/users/register'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', registerUserController)

    app.post('/sessions', authenticateController)
}
