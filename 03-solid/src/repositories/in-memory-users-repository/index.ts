import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UserRepository } from '../user-repository-interface'

export class InMemoryUsersRepository implements UserRepository {
    public items: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            created_at: new Date(),
            email: data.email,
            name: data.name,
            password_hash: data.password_hash,
        }

        this.items.push(user)

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async findById(id: string) {
        const user = this.items.find((item) => item.id === id)

        if (!user) {
            return null
        }

        return user
    }
}
