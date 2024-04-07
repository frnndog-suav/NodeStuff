import { execSync } from 'child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest --env test')
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

  it('should be able to get a specific transaction', async () => {
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

    const transactionId = listResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)

    expect(getTransactionResponse.body.transaction).toStrictEqual(
      expect.objectContaining({
        title: 'new transaction',
        amount: 5000
      })
    )
  })

  it('should be able to get summary', async () => {
    const createTransaction1Response = await request(app.server)
      .post('/transactions')
      .send({ title: 'credit transaction', amount: 5000, type: 'credit' })

    const cookies = createTransaction1Response.get('Set-Cookie')

    if (!cookies) {
      throw new Error('No cookie available')
    }

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({ title: 'debit transaction', amount: 3000, type: 'debit' })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)

    expect(summaryResponse.body.summary).toStrictEqual({
      amount: 2000
    })
  })
})
