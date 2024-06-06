import { Either, left, right } from '@/core/error/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found'

export type TEditQuestionUseCaseRequest = {
    authorId: string
    title: string
    content: string
    questionId: string
}

export type TEditQuestionUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question
    }
>

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({
        authorId,
        content,
        title,
        questionId,
    }: TEditQuestionUseCaseRequest): Promise<TEditQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        question.title = title
        question.content = content

        await this.questionsRepository.save(question)

        return right({
            question,
        })
    }
}
