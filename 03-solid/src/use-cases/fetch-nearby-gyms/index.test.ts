import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from '.'

let inMemoryGymsRepository: InMemoryGymsRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('FetchNearbyGymsUseCase', () => {
    beforeEach(async () => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(
            inMemoryGymsRepository
        )
    })

    it('should be able to fetch nearby gyms', async () => {
        await inMemoryGymsRepository.create({
            title: 'Near Gym',
            description: null,
            latitude: -23.4449708,
            longitude: -45.8948412,
            phone: null,
        })

        await inMemoryGymsRepository.create({
            title: 'Far Gym',
            description: null,
            latitude: -23.3114911,
            longitude: -51.3632592,
            phone: null,
        })

        const { gyms } = await fetchNearbyGymsUseCase.execute({
            userLatitude: -23.4449708,
            userLongitude: -45.8948412,
        })

        expect(gyms.length).toStrictEqual(1)
        expect(gyms).toStrictEqual([
            expect.objectContaining({ title: 'Near Gym' }),
        ])
    })
})
