import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from '.'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let getProfileUseCase: GetUserProfileUseCase

describe('GetUserProfileUseCase', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        getProfileUseCase = new GetUserProfileUseCase(inMemoryUsersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await inMemoryUsersRepository.create({
            name: 'Test',
            email: 'test@gmail.com',
            password_hash: await hash('123', 6),
        })

        const { user } = await getProfileUseCase.execute({
            userId: createdUser.id,
        })

        expect(user.id).toStrictEqual(expect.any(String))
        expect(user.name).toStrictEqual('Test')
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() =>
            getProfileUseCase.execute({
                userId: 'non-existing-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
