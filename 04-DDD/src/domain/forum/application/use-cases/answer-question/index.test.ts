import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerQuestionUseCase } from '.'
import { AnswersRepository } from '../../repositories/answers'

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
