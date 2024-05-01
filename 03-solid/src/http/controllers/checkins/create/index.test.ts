import { app } from '@/app'
import { prisma } from '@/lib/prisma/prisma'
import { createAndAuthenticateUser } from '@/utils/get-distance-between-coordinates/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('create check-in controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -23.4449708,
                longitude: -45.8948412,
            },
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -23.4449708,
                longitude: -45.8948412,
            })

        expect(response.statusCode).toStrictEqual(201)
    })
})
