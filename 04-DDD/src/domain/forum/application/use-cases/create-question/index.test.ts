import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/question'
import { CreateQuestionUseCase } from '.'

const fakeQuestionsRepository: QuestionsRepository = {
    create: async (question: Question) => {},
}

test('create an question', async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

    const { question } = await createQuestion.execute({
        authorId: '1',
        content: 'content',
        title: 'title',
    })

    expect(question.id).toBeTruthy()
})
