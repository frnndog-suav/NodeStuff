import { Entity } from '@/core/entities'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TCommentProps = {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Comment<
  Props extends TCommentProps,
> extends Entity<Props> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  set content(newContent: string) {
    this.props.content = newContent
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
