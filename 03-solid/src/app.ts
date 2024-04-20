import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { userRoutes } from './http/routes/users'

export const app = fastify()

app.register(userRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error', issues: error.format() })
    }

    if (env.NODE_ENV !== 'prod') {
        console.error(error)
    } else {
        //TODO log external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error' })
})
