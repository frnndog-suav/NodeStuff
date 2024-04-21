import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInstRepository } from '../check-ins-repository-interface'

export class InMemoryCheckInsRepository implements CheckInstRepository {
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn: CheckIn = {
            id: randomUUID(),
            gym_id: data.gym_id,
            user_id: data.user_id,
            created_at: new Date(),
            validated_at: data.validated_at
                ? new Date(data.validated_at)
                : null,
        }

        this.items.push(checkIn)

        return checkIn
    }
}
