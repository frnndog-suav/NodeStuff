import type { Knex } from 'knex'
import { env } from './src/env'

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: env.DATABASE_CLIENT,
    connection:
      env.DATABASE_CLIENT === 'sqlite'
        ? {
            filename: env.DATABASE_URL
          }
        : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      extension: 'ts'
    }
  },
  test: {
    client: env.DATABASE_CLIENT,
    connection:
      env.DATABASE_CLIENT === 'sqlite'
        ? {
            filename: env.DATABASE_URL
          }
        : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      extension: 'ts'
    }
  }
}

module.exports = config
