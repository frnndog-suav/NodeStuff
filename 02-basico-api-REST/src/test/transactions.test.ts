import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'
import { app } from '../app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({ title: 'new transaction', amount: 5000, type: 'credit' })

    expect(response.statusCode).toStrictEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'new transaction', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error('No cookie available')
    }

    const listResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
    expect(listResponse.statusCode).toStrictEqual(200)
    expect(listResponse.body.transactions).toStrictEqual([
      expect.objectContaining({ title: 'new transaction', amount: 5000 })
    ])
  })
})
