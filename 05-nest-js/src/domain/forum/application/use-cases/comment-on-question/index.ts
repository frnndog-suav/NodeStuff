import { Either, left, right } from '@/core/error/either'
import { QuestionComment } from '@/domain/forum/enterprise/entities/comment/question-comment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { QuestionsRepository } from '../../repositories/questions'
import { QuestionCommentsRepository } from '../../repositories/questions-comment'
import { ResourceNotFoundError } from '../_errors/resource-not-found'

export type TCommentOnQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  content: string
}

export type TCommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: TCommentOnQuestionUseCaseRequest): Promise<TCommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(questionId),
    })

    await this.questionsCommentRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
