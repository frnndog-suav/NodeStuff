import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from '.'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: CreateQuestionUseCase

describe('[Use Case] - Create question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionsRepository()
        useCase = new CreateQuestionUseCase(inMemoryRepository)
    })

    it('should be able to create a question', async () => {
        const { question } = await useCase.execute({
            authorId: '1',
            content: 'content',
            title: 'title',
        })

        expect(question.id).toBeTruthy()
        expect(inMemoryRepository.items[0].id).toStrictEqual(question.id)
    })
})
