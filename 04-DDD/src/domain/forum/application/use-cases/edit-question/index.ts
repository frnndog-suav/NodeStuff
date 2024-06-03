import { QuestionsRepository } from '../../repositories/question'

export type TEditQuestionUseCaseRequest = {
    authorId: string
    title: string
    content: string
    questionId: string
}

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({
        authorId,
        content,
        title,
        questionId,
    }: TEditQuestionUseCaseRequest): Promise<void> {
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
    }
}
