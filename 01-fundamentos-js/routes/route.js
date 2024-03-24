import { Database } from "../database/database.js"
import { randomUUID } from 'node:crypto'

const database = new Database

export const ROUTES = [
    {
        method: 'GET',
        path: '/users',
        handler: (_, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email
            }

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    },
]