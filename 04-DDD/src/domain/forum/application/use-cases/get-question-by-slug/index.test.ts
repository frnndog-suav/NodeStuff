import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from '.'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

let inMemoryRepository: InMemoryQuestionsRepository
let useCase: GetQuestionBySlugUseCase

describe('[Use Case] - Get question by slug', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionsRepository()
        useCase = new GetQuestionBySlugUseCase(inMemoryRepository)
    })

    it('it should be able get question by slug', async () => {
        const newQuestion = Question.create({
            title: 'Example question',
            slug: Slug.create('example-question'),
            authorId: new UniqueEntityID(),
            content: '',
        })

        inMemoryRepository.create(newQuestion)

        const { question } = await useCase.execute({
            slug: 'example-question',
        })

        expect(question.id).toBeTruthy()
        expect(question.title).toStrictEqual(newQuestion.title)
    })
})
