import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInstRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
