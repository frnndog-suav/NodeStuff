import { Either, left, right } from '@/core/error/either'
import { QuestionCommentsRepository } from '../../repositories/questions-comment'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found'

export type TDeleteCommentOnQuestionUseCaseRequest = {
  authorId: string
  questionCommentId: string
}

export type TDeleteCommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteCommentOnQuestionUseCase {
  constructor(private questionsCommentRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: TDeleteCommentOnQuestionUseCaseRequest): Promise<TDeleteCommentOnQuestionUseCaseResponse> {
    const questionComment =
      await this.questionsCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionsCommentRepository.delete(questionComment)

    return right(null)
  }
}
