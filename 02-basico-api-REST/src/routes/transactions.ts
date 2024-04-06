import { FastifyInstance } from 'fastify'
import knex from 'knex'

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/transaction/all', async () => {
    const transactions = await knex('transactions').select('*')

    return transactions
  })
}
