import { Either, right } from '@/core/error/either'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/attachment/question-attachment'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { QuestionsRepository } from '../../repositories/questions'

export type TCreateQuestionUseCaseRequest = {
    authorId: string
    title: string
    content: string
    attachmentsId: string[]
}

export type TCreateQuestionUseCaseResponse = Either<
    null,
    {
        question: Question
    }
>

export class CreateQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({
        authorId,
        content,
        title,
        attachmentsId,
    }: TCreateQuestionUseCaseRequest): Promise<TCreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content,
        })

        const questionAttachments = attachmentsId.map((attachmentId) => {
            return QuestionAttachment.create({
                attachmentId,
                questionId: question.id.toString(),
            })
        })

        question.attachments = questionAttachments

        await this.questionsRepository.create(question)

        return right({
            question,
        })
    }
}
