import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('refresh token controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to refresh token', async () => {
        await request(app.server).post('/users').send({
            name: 'Teste Silva',
            email: 'teste.silva@gmail.com',
            password: '123456',
        })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'teste.silva@gmail.com',
            password: '123456',
        })

        const cookies = authResponse.get('Set-Cookie')

        if (!cookies) throw new Error('Cookies not available!')

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)

        expect(response.statusCode).toStrictEqual(200)
        expect(response.body).toStrictEqual({
            token: expect.any(String),
        })
        expect(response.get('Set-Cookie')).toStrictEqual([
            expect.stringContaining('refreshToken='),
        ])
    })
})
