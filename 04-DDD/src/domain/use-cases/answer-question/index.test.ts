import { Answer } from '@/domain/entities/answer'
import { AnswersRepository } from '@/domain/repositories/answers'
import { AnswerQuestionUseCase } from '.'

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
