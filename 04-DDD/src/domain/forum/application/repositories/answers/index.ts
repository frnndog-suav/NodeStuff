import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswersRepository {
    create(answer: Answer): Promise<void>
    findById(id: string): Promise<Answer | null>
    delete(answer: Answer): Promise<void>
    save(answer: Answer): Promise<void>
    findManyByAnswerId(questionId: string, params: PaginationParams): Promise<Answer[]>
}
