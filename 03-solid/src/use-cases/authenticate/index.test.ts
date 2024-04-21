import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '.'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('AuthenticateUseCase', () => {
    it('should be able to authenticate', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const authenticateUserCase = new AuthenticateUseCase(
            inMemoryUsersRepository
        )

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
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const authenticateUserCase = new AuthenticateUseCase(
            inMemoryUsersRepository
        )

        await expect(() =>
            authenticateUserCase.execute({
                email: 'test@gmail.com',
                password: '123',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const authenticateUserCase = new AuthenticateUseCase(
            inMemoryUsersRepository
        )

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
