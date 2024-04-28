import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinates'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym: Gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        }

        this.items.push(gym)

        return gym
    }

    async searchMany(query: string, page: number) {
        return this.items
            .filter((item) =>
                item.title
                    .toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase())
            )
            .slice((page - 1) * 20, page * 20)
    }

    async findManyNearby(params: FindManyNearbyParams) {
        const MAX_KILOMETERS_RANGE = 10

        return this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinate(
                {
                    latitude: params.latitude,
                    longitude: params.longitude,
                },
                {
                    latitude: item.latitude.toNumber(),
                    longitude: item.longitude.toNumber(),
                }
            )

            return distance < MAX_KILOMETERS_RANGE
        })
    }
}
