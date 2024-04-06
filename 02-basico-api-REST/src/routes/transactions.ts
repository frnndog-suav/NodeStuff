import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'

export async function transactionRoutes(app: FastifyInstance) {
    app.get('/', async () => {
        const transactions = await knex('transactions').select()

        return {
            transactions,
        }
    })

    app.get('/:id', async (request) => {
        const getTransactionsParamSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionsParamSchema.parse(request.params)

        const transaction = await knex('transactions').where('id', id).first()

        return { transaction }
    })

    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { amount, title, type } = createTransactionBodySchema.parse(
            request.body,
        )

        await knex('transactions').insert({
            id: crypto.randomUUID(),
            amount: type === 'credit' ? amount : amount * -1,
            title,
        })

        return reply.status(201).send()
    })
}
