import { app } from '@/app'
import { prisma } from '@/lib/prisma/prisma'
import { createAndAuthenticateUser } from '@/utils/get-distance-between-coordinates/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('validate check-in controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to validate check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -23.4449708,
                longitude: -45.8948412,
            },
        })

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id,
            },
        })

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toStrictEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id,
            },
        })

        expect(checkIn.validated_at).toStrictEqual(expect.any(Date))
    })
})
