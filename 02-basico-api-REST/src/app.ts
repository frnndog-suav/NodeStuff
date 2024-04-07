import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { transactionRoutes } from './routes/transactions'

export const app = fastify()

// app.addHook('preHandler', async () => {
//   console.log("exemplo de middleware global para toda a aplicação")
// })

app.register(fastifyCookie)

app.register(transactionRoutes, {
  prefix: 'transactions'
})
