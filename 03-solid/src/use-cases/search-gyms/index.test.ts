import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from '.'

let inMemoryGymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('SearchGymsUseCase', () => {
    beforeEach(async () => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        searchGymsUseCase = new SearchGymsUseCase(inMemoryGymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await inMemoryGymsRepository.create({
            title: 'Javascript Gym',
            description: null,
            latitude: -23.4449708,
            longitude: -45.8948412,
            phone: null,
        })

        await inMemoryGymsRepository.create({
            title: 'Typescript Gym',
            description: null,
            latitude: -23.4449708,
            longitude: -45.8948412,
            phone: null,
        })

        const { gyms } = await searchGymsUseCase.execute({
            query: 'Javascript',
            page: 1,
        })

        expect(gyms.length).toStrictEqual(1)
        expect(gyms).toStrictEqual([
            expect.objectContaining({ title: 'Javascript Gym' }),
        ])
    })

    it('should be able to fetch paginated gym search', async () => {
        for (let index = 0; index < 22; index++) {
            await inMemoryGymsRepository.create({
                title: `Javascript Gym ${index}`,
                description: null,
                latitude: -23.4449708,
                longitude: -45.8948412,
                phone: null,
            })
        }

        const { gyms } = await searchGymsUseCase.execute({
            query: 'Javascript',
            page: 2,
        })

        expect(gyms.length).toStrictEqual(2)
        expect(gyms).toStrictEqual([
            expect.objectContaining({ title: 'Javascript Gym 20' }),
            expect.objectContaining({ title: 'Javascript Gym 21' }),
        ])
    })
})
