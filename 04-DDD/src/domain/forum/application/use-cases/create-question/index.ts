import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { QuestionsRepository } from '../../repositories/questions'
import { Either, right } from '@/core/error/either'

export type TCreateQuestionUseCaseRequest = {
    authorId: string
    title: string
    content: string
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
    }: TCreateQuestionUseCaseRequest): Promise<TCreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityID(authorId),
            title,
            content,
        })

        await this.questionsRepository.create(question)

        return right({
            question,
        })
    }
}
