import { UserRepository } from '@/repositories/user-repository-interface'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseParams {
    name: string
    email: string
    password: string
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({ email, name, password }: RegisterUserUseCaseParams) {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('Email already exists!')
        }

        await this.usersRepository.create({
            email,
            name,
            password_hash: passwordHash,
        })
    }
}
