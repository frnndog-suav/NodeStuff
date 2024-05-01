import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('register controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server).post('/users').send({
            name: 'Teste Silva',
            email: 'teste.silva@gmail.com',
            password: '123456',
        })

        expect(response.statusCode).toStrictEqual(201)
    })
})
