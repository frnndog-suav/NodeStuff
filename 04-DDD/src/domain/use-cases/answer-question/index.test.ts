import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from '.'
import { AnswersRepository } from '../../repositories/answers'
import { Answer } from '../../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {},
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        content: 'Answer A',
        instructorId: '1',
        questionId: '1',
    })

    expect(answer.content).toStrictEqual('Answer A')
})
