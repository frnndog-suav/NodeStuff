import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/_errors/resource-not-found'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/entities/events/question-best-answer-chosen-event'
import { SendNotificationUseCase } from '../../use-cases/send-notification'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendNewQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (!answer) {
      throw new ResourceNotFoundError()
    }

    await this.sendNotification.execute({
      recipientId: answer.authorId.toString(),
      title: `Sua resposta foi escolhida!`,
      content: `A resposta que você enviou em ${question.title.substring(0, 20).concat('...')} foi escolhida pelo autor!`,
    })
  }
}
