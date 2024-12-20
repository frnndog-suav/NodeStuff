import { prisma } from '@/lib/prisma/prisma'
import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { CheckInstRepository } from '../check-ins-repository-interface'

const ITEMS_PER_PAGE = 20

export class PrismaCheckInsRepository implements CheckInstRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({ data })

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate(),
                },
            },
        })

        return checkIn
    }

    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId,
            },
            take: ITEMS_PER_PAGE,
            skip: (page - 1) * ITEMS_PER_PAGE,
        })

        return checkIns
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId,
            },
        })

        return count
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id,
            },
        })

        return checkIn
    }

    async save(data: CheckIn) {
        const updatedCheckIn = await prisma.checkIn.update({
            where: {
                id: data.id,
            },
            data,
        })

        return updatedCheckIn
    }
}
