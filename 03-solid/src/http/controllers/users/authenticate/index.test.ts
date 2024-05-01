import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('authenticate controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'Teste Silva',
            email: 'teste.silva@gmail.com',
            password: '123456',
        })

        const response = await request(app.server).post('/sessions').send({
            email: 'teste.silva@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toStrictEqual(200)
        expect(response.body).toStrictEqual({
            token: expect.any(String),
        })
    })
})
