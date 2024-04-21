import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from '.'

describe('RegisterUserUseCase', () => {
    it('should hash user password upon registration', async () => {
        const registerUseCase = new RegisterUserUseCase({
            async create(data) {
                return {
                    id: 'user',
                    created_at: new Date(),
                    email: data.email,
                    name: data.name,
                    password_hash: data.password_hash,
                }
            },

            async findByEmail(email) {
                return null
            },
        })

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
})
