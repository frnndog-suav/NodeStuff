// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      amount: number
      title: string
      created_at: string
      sessions_id?: string
    }
  }
}
