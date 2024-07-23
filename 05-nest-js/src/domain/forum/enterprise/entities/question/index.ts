import { AggregateRoot } from '@/core/pattern/aggregate-root'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionBestAnswerChosenEvent } from '../events/question-best-answer-chosen-event'
import { Slug } from '../value-objects/slug'
import { UniqueEntityID } from '../value-objects/unique-entity-id'
import { QuestionAttachmentList } from '../watched-list/question'

export type TQuestionProps = {
  authorId: UniqueEntityID
  bestAnswerID?: UniqueEntityID | null
  title: string
  content: string
  slug: Slug
  attachments: QuestionAttachmentList
  createdAt: Date
  updatedAt?: Date | null
}

export class Question extends AggregateRoot<TQuestionProps> {
  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get slug() {
    return this.props.slug
  }

  get bestAnswerID() {
    return this.props.bestAnswerID
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get attachments() {
    return this.props.attachments
  }

  set content(newContent: string) {
    this.props.content = newContent
    this.touch()
  }

  set title(newTitle: string) {
    this.props.title = newTitle
    this.props.slug = Slug.createFromText(newTitle)
    this.touch()
  }

  set bestAnswerID(newBestAnswerID: UniqueEntityID | undefined | null) {
    if (newBestAnswerID === undefined || newBestAnswerID === null) {
      return
    }

    if (
      this.props.bestAnswerID === undefined ||
      this.props.bestAnswerID === null ||
      !this.props.bestAnswerID.equals(newBestAnswerID)
    ) {
      this.addDomainEvent(
        new QuestionBestAnswerChosenEvent(this, newBestAnswerID),
      )
    }

    this.props.bestAnswerID = newBestAnswerID
    this.touch()
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(
    props: Optional<TQuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
      },
      id,
    )

    return question
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
