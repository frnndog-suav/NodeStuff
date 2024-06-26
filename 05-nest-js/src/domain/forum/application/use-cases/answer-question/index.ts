import { Either, right } from '@/core/error/either'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/attachment/answer-attachment'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/watched-list/answer'
import { Answer } from '../../../enterprise/entities/answer'
import { UniqueEntityID } from '../../../enterprise/entities/value-objects/unique-entity-id'
import { AnswersRepository } from '../../repositories/answers'

export type TAnswerQuestionUseCaseRequest = {
  instructorId: string
  questionId: string
  content: string
  attachmentsId: string[]
}

export type TAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsId,
  }: TAnswerQuestionUseCaseRequest): Promise<TAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsId.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({ answer })
  }
}
