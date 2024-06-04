import { QuestionsCommentRepository } from '@/domain/forum/application/repositories/questions-comment'
import { QuestionComment } from '@/domain/forum/enterprise/entities/comment/question-comment'

export class InMemoryQuestionsCommentRepository
    implements QuestionsCommentRepository
{
    public items: QuestionComment[] = []

    async create(questionComment: QuestionComment): Promise<void> {
        this.items.push(questionComment)
    }

    async findById(id: string): Promise<QuestionComment | null> {
        const questionComment = this.items.find(
            (item) => item.id.toString() === id
        )

        if (!questionComment) {
            return null
        }

        return questionComment
    }

    async delete(questionComment: QuestionComment): Promise<void> {
        const itemIndex = this.items.findIndex(
            (item) => item.id === questionComment.id
        )
        this.items.splice(itemIndex, 1)
    }
}
