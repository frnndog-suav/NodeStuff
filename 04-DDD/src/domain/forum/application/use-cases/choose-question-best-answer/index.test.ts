import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseAnswerBestAnswerUseCase } from '.'
import { NotAllowedError } from '../_errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let useCase: ChooseAnswerBestAnswerUseCase

describe('[Use Case] - Choose question best answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        useCase = new ChooseAnswerBestAnswerUseCase(
            inMemoryAnswersRepository,
            inMemoryQuestionsRepository
        )
    })

    it('it should be able to choose question best answer', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({
            questionId: question.id,
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)

        await useCase.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString(),
        })

        expect(inMemoryQuestionsRepository.items[0].bestAnswerID).toStrictEqual(
            answer.id
        )
    })

    it('it should be able to choose another user question best answer', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1'),
        })
        const answer = makeAnswer({
            questionId: question.id,
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)

        const result = await useCase.execute({
            answerId: answer.id.toString(),
            authorId: 'author-2',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
