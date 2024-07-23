import { Either, left, right } from '@/core/error/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/attachment/answer-attachment'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/watched-list/answer'
import { AnswerAttachmentRepository } from '../../repositories/answer-attachments'
import { AnswersRepository } from '../../repositories/answers'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found'
import { Injectable } from '@nestjs/common'

export type TEditAnswerUseCaseRequest = {
  authorId: string
  content: string
  answerId: string
  attachmentsId: string[]
}

export type TEditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
    attachmentsId,
  }: TEditAnswerUseCaseRequest): Promise<TEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const refAnswerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const newAnswerAttachments = attachmentsId.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    refAnswerAttachmentList.update(newAnswerAttachments)

    answer.content = content
    answer.attachments = refAnswerAttachmentList

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
