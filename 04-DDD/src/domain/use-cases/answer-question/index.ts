import { Answer } from '../../entities/answer'

export type TAnswerQuestionUseCaseRequest = {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {
    execute({
        instructorId,
        questionId,
        content,
    }: TAnswerQuestionUseCaseRequest) {
        const answer = new Answer({
            authorId: instructorId,
            content,
            questionId,
        })

        return answer
    }
}
