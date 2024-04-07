import type { Knex } from 'knex'

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/app.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      extension: 'ts'
    }
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db/test.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      extension: 'ts'
    }
  }
}

module.exports = config
