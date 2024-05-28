import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from '.'

test('create an answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
        content: 'Answer A',
        instructorId: '1',
        questionId: '1',
    })

    expect(answer.content).toStrictEqual('Answer A')
})
