import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from '.'

let inMemoryGymsRepository: InMemoryGymsRepository
let createGymsUseCase: CreateGymUseCase

describe('CreateGymUseCase', () => {
    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        createGymsUseCase = new CreateGymUseCase(inMemoryGymsRepository)
    })

    it('should be able to create a gym', async () => {
        const { gym } = await createGymsUseCase.execute({
            title: 'Test Gym',
            description: null,
            latitude: -23.4449708,
            longitude: -45.8948412,
            phone: null,
        })

        expect(gym.id).toStrictEqual(expect.any(String))
    })
})
