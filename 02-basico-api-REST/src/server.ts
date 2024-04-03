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

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('server is running....')
  })
