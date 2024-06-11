import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from '.'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswersAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersAttachmentRepository: InMemoryAnswersAttachmentRepository

describe('[Subscriber] On answer created', () => {
    beforeEach(() => {
        inMemoryAnswersAttachmentRepository =
            new InMemoryAnswersAttachmentRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(
            inMemoryAnswersAttachmentRepository
        )
    })

    it('should send a notification when an answer is created', () => {
        const _onAnswerCreated = new OnAnswerCreated()

        const answer = makeAnswer()

        inMemoryAnswersRepository.create(answer)
    })
})
