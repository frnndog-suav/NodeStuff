import { Entity } from '@/core/entities'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

export type TNotificationProps = {
  title: string
  content: string
  createdAt: Date
  recipientId: UniqueEntityID
  readAt?: Date | null
}

export class Notification extends Entity<TNotificationProps> {
  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get recipientId() {
    return this.props.recipientId
  }

  get readAt() {
    return this.props.readAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<TNotificationProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return notification
  }
}
