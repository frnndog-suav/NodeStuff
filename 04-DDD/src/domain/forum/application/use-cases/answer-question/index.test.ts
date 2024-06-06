import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from '.'

let inMemoryRepository: InMemoryAnswersRepository
let useCase: AnswerQuestionUseCase

describe('[Use Case] - Answer question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswersRepository()
        useCase = new AnswerQuestionUseCase(inMemoryRepository)
    })

    it('should be able to create an answer', async () => {
        const result = await useCase.execute({
            content: 'Answer A',
            instructorId: '1',
            questionId: '1',
        })

        expect(result.isRight()).toBe(true)

        expect(inMemoryRepository.items[0].id).toEqual(result.value?.answer.id)
    })
})
