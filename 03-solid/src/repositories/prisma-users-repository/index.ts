import { prisma } from '@/lib/prisma/prisma'
import { Prisma } from '@prisma/client'
import { UserRepository } from '../user-repository-interface'

export class PrismaUserRepository implements UserRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }

    findById(
        id: string
    ): Promise<{
        id: string
        name: string
        email: string
        password_hash: string
        created_at: Date
    } | null> {
        throw new Error('Method not implemented.')
    }
}
