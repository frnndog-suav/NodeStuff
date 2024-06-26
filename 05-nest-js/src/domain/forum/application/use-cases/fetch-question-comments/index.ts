import { Either, right } from '@/core/error/either'
import { QuestionComment } from '@/domain/forum/enterprise/entities/comment/question-comment'
import { QuestionCommentsRepository } from '../../repositories/questions-comment'

export type TFetchQuestionCommentsUseCaseRequest = {
  page: number
  questionId: string
}

export type TFetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionsCommentRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: TFetchQuestionCommentsUseCaseRequest): Promise<TFetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionsCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
