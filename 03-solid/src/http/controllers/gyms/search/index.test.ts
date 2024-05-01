import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/get-distance-between-coordinates/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('search gyms controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search gyms by title', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Typescript Gym',
                description: 'Cool description',
                phone: '123456789',
                latitude: -23.4449708,
                longitude: -45.8948412,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript Gym',
                description: 'Cool description',
                phone: '123456789',
                latitude: -23.4449708,
                longitude: -45.8948412,
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({ q: 'Javascript' })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toStrictEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toStrictEqual([
            expect.objectContaining({
                title: 'Javascript Gym',
            }),
        ])
    })
})
