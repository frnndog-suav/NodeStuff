import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from '.'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: GetQuestionBySlugUseCase

describe('[Use Case] - Get question by slug', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionsRepository()
        useCase = new GetQuestionBySlugUseCase(inMemoryRepository)
    })

    it('it should be able get question by slug', async () => {
        const newQuestion = makeQuestion()

        inMemoryRepository.create(newQuestion)

        const { question } = await useCase.execute({
            slug: 'example-question',
        })

        expect(question.id).toBeTruthy()
        expect(question.title).toStrictEqual(newQuestion.title)
    })
})
