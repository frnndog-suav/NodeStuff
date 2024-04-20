import { registerUser } from '@/http/controllers/users/register'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', registerUser)
}
