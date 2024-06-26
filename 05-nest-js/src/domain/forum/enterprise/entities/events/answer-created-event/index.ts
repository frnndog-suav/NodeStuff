import { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../../answer'
import { UniqueEntityID } from '../../value-objects/unique-entity-id'

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id
  }
}
