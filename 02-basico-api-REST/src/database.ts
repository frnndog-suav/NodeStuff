import { knex as setUpKnex } from 'knex'
import { config } from '../knexfile'

export const knex = setUpKnex(config)
