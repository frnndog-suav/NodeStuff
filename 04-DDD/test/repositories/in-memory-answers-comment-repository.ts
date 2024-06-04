import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comment'
import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'

export class InMemoryAnswersCommentRepository
    implements AnswersCommentRepository
{
    public items: AnswerComment[] = []

    async create(answerComment: AnswerComment): Promise<void> {
        this.items.push(answerComment)
    }

    async findById(id: string): Promise<AnswerComment | null> {
        const answerComment = this.items.find(
            (item) => item.id.toString() === id
        )

        if (!answerComment) {
            return null
        }

        return answerComment
    }

    async delete(answerComment: AnswerComment): Promise<void> {
        const itemIndex = this.items.findIndex(
            (item) => item.id === answerComment.id
        )
        this.items.splice(itemIndex, 1)
    }
}
