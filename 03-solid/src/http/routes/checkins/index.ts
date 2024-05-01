import { createCheckInController } from '@/http/controllers/checkins/create'
import { checkInsHistoryController } from '@/http/controllers/checkins/historic'
import { checkInsMetricsController } from '@/http/controllers/checkins/metrics'
import { validateCheckInController } from '@/http/controllers/checkins/validate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'

export async function checkinsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/:gymId/check-ins', createCheckInController)

    app.patch(
        '/check-ins/:checkInId/validate',
        {
            onRequest: [verifyUserRole('ADMIN')],
        },
        validateCheckInController
    )

    app.get('/check-ins/history', checkInsHistoryController)

    app.get('/check-ins/metrics', checkInsMetricsController)
}
