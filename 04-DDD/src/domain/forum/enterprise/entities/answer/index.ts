import { Entity } from '@/core/entities'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TAnswerProps = {
    content: string
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    createdAt: Date
    updatedAt?: Date
}

export class Answer extends Entity<TAnswerProps> {
    get content() {
        return this.props.content
    }
    get authorId() {
        return this.props.authorId
    }
    get questionId() {
        return this.props.questionId
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
        this.content = newContent
        this.touch()
    }

    static create(
        props: Optional<TAnswerProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const answer = new Answer(
            {
                ...props,
                createdAt: new Date(),
            },
            id
        )
        return answer
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}
