import { knex as setUpKnex, Knex } from 'knex'
import 'dotenv/config'

if (!process.env.DATABASE_URL) {
  throw new Error("Env variable 'DATABASE_URL' not found.")
}

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
}

export const knex = setUpKnex(config)
