import { QuestionsCommentRepository } from '@/domain/forum/application/repositories/questions-comment'
import { QuestionComment } from '@/domain/forum/enterprise/entities/comment/question-comment'

export class InMemoryQuestionsCommentRepository
    implements QuestionsCommentRepository
{
    public items: QuestionComment[] = []

    async create(questionComment: QuestionComment): Promise<void> {
        this.items.push(questionComment)
    }
}
