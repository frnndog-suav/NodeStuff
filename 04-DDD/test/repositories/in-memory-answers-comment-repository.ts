import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comment'
import { AnswerComment } from '@/domain/forum/enterprise/entities/comment/answer-comment'

export class InMemoryAnswersCommentRepository
    implements AnswersCommentRepository
{
    public items: AnswerComment[] = []

    async create(answerComment: AnswerComment): Promise<void> {
        this.items.push(answerComment)
    }
}
