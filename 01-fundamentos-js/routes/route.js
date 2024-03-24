import { Database } from "../database/database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "../utils/build-route-path.js"

const database = new Database

export const ROUTES = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (_, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
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
    {
        method: 'DELETE',
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            return res.end()
        }
    }
]