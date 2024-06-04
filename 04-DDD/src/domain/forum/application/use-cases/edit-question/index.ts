import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions'

export type TEditQuestionUseCaseRequest = {
    authorId: string
    title: string
    content: string
    questionId: string
}

export type TEditQuestionUseCaseResponse = {
    question: Question
}

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
            throw new Error('Question not found.')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        question.title = title
        question.content = content

        await this.questionsRepository.save(question)

        return {
            question,
        }
    }
}
