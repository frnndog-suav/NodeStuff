import { Question } from '@/domain/forum/enterprise/entities/question'

export class QuestionPresenter {
  static toHttp(question: Question) {
    return {
      id: question.id,
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerID?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
