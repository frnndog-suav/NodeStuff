import { Either, right } from '@/core/error/either'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { Injectable } from '@nestjs/common'
import { QuestionCommentsRepository } from '../../repositories/questions-comment'

export type TFetchQuestionCommentsUseCaseRequest = {
  page: number
  questionId: string
}

export type TFetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionsCommentRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: TFetchQuestionCommentsUseCaseRequest): Promise<TFetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionsCommentRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({
      comments,
    })
  }
}
