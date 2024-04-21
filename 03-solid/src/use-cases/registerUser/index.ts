import { UserRepository } from '@/repositories/user-repository-interface'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { User } from '@prisma/client'

interface RegisterUserUseCaseParams {
    name: string
    email: string
    password: string
}

interface RegisterUserUseCaseResponse {
    user: User
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({
        email,
        name,
        password,
    }: RegisterUserUseCaseParams): Promise<RegisterUserUseCaseResponse> {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            email,
            name,
            password_hash: passwordHash,
        })

        return {
            user,
        }
    }
}
