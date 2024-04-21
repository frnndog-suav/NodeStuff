import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from '.'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUserUseCase

describe('RegisterUserUseCase', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUserUseCase(inMemoryUsersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await registerUseCase.execute({
            name: 'Test',
            email: 'test@gmail.com',
            password: '123456',
        })

        expect(user.id).toStrictEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const { user } = await registerUseCase.execute({
            name: 'Test',
            email: 'test@gmail.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toStrictEqual(true)
    })

    it('should not be able to register with the same email twice', async () => {
        const email = 'test@gmail.com'

        await registerUseCase.execute({
            name: 'Test',
            email: email,
            password: '123456',
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'Fake',
                email: email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
