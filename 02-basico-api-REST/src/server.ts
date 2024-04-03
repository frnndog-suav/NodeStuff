import fastify from 'fastify'
import { knex } from './database'

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

app.get('/transaction/all', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('server is running....')
  })
