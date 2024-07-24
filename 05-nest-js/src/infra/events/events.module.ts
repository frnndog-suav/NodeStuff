import { OnAnswerCreated } from '@/domain/notification/application/subscriber/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscriber/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DataBaseModule } from '../database/database.module'

@Module({
  imports: [DataBaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
