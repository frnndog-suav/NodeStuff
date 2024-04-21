import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '.'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUserCase: AuthenticateUseCase

describe('AuthenticateUseCase', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        authenticateUserCase = new AuthenticateUseCase(inMemoryUsersRepository)
    })

    it('should be able to authenticate', async () => {
        await inMemoryUsersRepository.create({
            name: 'Test',
            email: 'test@gmail.com',
            password_hash: await hash('123', 6),
        })

        const { user } = await authenticateUserCase.execute({
            email: 'test@gmail.com',
            password: '123',
        })

        expect(user.id).toStrictEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            authenticateUserCase.execute({
                email: 'test@gmail.com',
                password: '123',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await inMemoryUsersRepository.create({
            name: 'Test',
            email: 'test@gmail.com',
            password_hash: await hash('123', 6),
        })

        await expect(() =>
            authenticateUserCase.execute({
                email: 'test@gmail.com',
                password: '4646458',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
