import { Either, left, right } from '@/core/error/either'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/attachment/question-attachment'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/watched-list/question'
import { QuestionAttachmentRepository } from '../../repositories/question-attachments'
import { QuestionsRepository } from '../../repositories/questions'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found'

export type TEditQuestionUseCaseRequest = {
  authorId: string
  title: string
  content: string
  questionId: string
  attachmentsId: string[]
}

export type TEditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentRepository,
  ) {}

  async execute({
    authorId,
    content,
    title,
    questionId,
    attachmentsId,
  }: TEditQuestionUseCaseRequest): Promise<TEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const refQuestionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const newQuestionAttachments = attachmentsId.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    refQuestionAttachmentList.update(newQuestionAttachments)

    question.title = title
    question.content = content
    question.attachments = refQuestionAttachmentList

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
