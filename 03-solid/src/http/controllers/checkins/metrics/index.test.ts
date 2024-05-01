import { app } from '@/app'
import { prisma } from '@/lib/prisma/prisma'
import { createAndAuthenticateUser } from '@/utils/get-distance-between-coordinates/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('check-in metrics controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get the total count of check-ins', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -23.4449708,
                longitude: -45.8948412,
            },
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
            ],
        })

        const response = await request(app.server)
            .get(`/check-ins/metrics`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toStrictEqual(200)
        expect(response.body.checkInsCount).toStrictEqual(2)
    })
})
