import fastify from 'fastify'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'
import fastifyCookie from '@fastify/cookie'

const app = fastify()

// app.addHook('preHandler', async () => {
//   console.log("exemplo de middleware global para toda a aplicação")
// })

app.register(fastifyCookie)

app.register(transactionRoutes, {
  prefix: 'transactions'
})

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log('server is running....')
  })
