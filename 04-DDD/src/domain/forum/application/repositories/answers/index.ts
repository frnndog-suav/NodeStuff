import { Answer } from '../../subdomain/forum/enterprise/entities/answer'

export interface AnswersRepository {
    create(answer: Answer): Promise<void>
}
