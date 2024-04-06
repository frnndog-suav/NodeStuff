import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app = fastify()

app.get('/hello', () => {
  return 'Hello World'
})

app.get('/db', async () => {
  const test = await knex('sqlite_schema').select('*')
  return test
})

app.get('/transaction/test', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.register(transactionRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('server is running....')
  })
