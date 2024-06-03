import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

const ITEMS_PER_PAGE = 20

export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = []

    async create(answer: Answer) {
        this.items.push(answer)
    }

    async findById(id: string): Promise<Answer | null> {
        const answer = this.items.find((item) => item.id.toString() === id)

        if (!answer) {
            return null
        }

        return answer
    }

    async delete(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)
        this.items.splice(itemIndex, 1)
    }

    async save(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)
        this.items[itemIndex] = answer
    }

    async findManyByQuestionId(
        questionId: string,
        { page }: PaginationParams
    ): Promise<Answer[]> {
        const answers = this.items
            .filter((answer) => answer.questionId.toString() === questionId)
            .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

        return answers
    }
}
