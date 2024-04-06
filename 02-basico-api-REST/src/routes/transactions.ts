import { FastifyInstance } from 'fastify'
import crypto, { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

const MAX_AGE_7_DAYS = 60 * 60 * 24 * 7

export async function transactionRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('sessions_id', sessionId)
        .select()

      return {
        transactions
      }
    }
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const getTransactionsParamSchema = z.object({
        id: z.string().uuid()
      })

      const { sessionId } = request.cookies

      const { id } = getTransactionsParamSchema.parse(request.params)

      const transaction = await knex('transactions')
        .where({
          id,
          sessions_id: sessionId
        })
        .first()

      return { transaction }
    }
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body
    )

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: MAX_AGE_7_DAYS
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      amount: type === 'credit' ? amount : amount * -1,
      title,
      sessions_id: sessionId
    })

    return reply.status(201).send()
  })

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('sessions_id', sessionId)
        .sum('amount as amount')
        .first()
      return { summary }
    }
  )
}
