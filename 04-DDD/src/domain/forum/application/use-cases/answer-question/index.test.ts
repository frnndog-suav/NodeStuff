import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from '.'

let inMemoryRepository: InMemoryAnswersRepository
let useCase: AnswerQuestionUseCase

describe('[Use Case] - Create question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswersRepository()
        useCase = new AnswerQuestionUseCase(inMemoryRepository)
    })

    it('should be able to create an answer', async () => {
        const { answer } = await useCase.execute({
            content: 'Answer A',
            instructorId: '1',
            questionId: '1',
        })

        expect(answer.id).toBeTruthy()
        expect(inMemoryRepository.items[0].id).toStrictEqual(answer.id)
    })
})
