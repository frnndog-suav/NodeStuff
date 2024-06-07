import { AggregateRoot } from '@/core/pattern/aggregate-root'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { Slug } from '../value-objects/slug'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TQuestionProps = {
    title: string
    content: string
    authorId: UniqueEntityID
    slug: Slug
    bestAnswerID?: UniqueEntityID
    createdAt: Date
    updatedAt?: Date
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

    set content(newContent: string) {
        this.props.content = newContent
        this.touch()
    }
    set title(newTitle: string) {
        this.props.title = newTitle
        this.props.slug = Slug.createFromText(newTitle)
        this.touch()
    }
    set bestAnswerID(newBestAnswerID: UniqueEntityID | undefined) {
        this.props.bestAnswerID = newBestAnswerID
        this.touch()
    }

    static create(
        props: Optional<TQuestionProps, 'createdAt' | 'slug'>,
        id?: UniqueEntityID
    ) {
        const question = new Question(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
                slug: props.slug ?? Slug.createFromText(props.title),
            },
            id
        )

        return question
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}
