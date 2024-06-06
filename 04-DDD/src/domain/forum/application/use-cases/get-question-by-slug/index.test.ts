import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
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
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question'),
        })

        inMemoryRepository.create(newQuestion)

        const result = await useCase.execute({
            slug: 'example-question',
        })

        expect(result.value).toMatchObject({
            question: expect.objectContaining({ title: newQuestion.title }),
        })
    })
})
