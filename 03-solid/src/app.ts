import fastify from 'fastify'
import { userRoutes } from './http/routes/users'

export const app = fastify()

app.register(userRoutes)
