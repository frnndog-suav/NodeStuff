import { Entity } from '@/core/entities'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TAnswerCommentProps = {
    authorId: UniqueEntityID
    answerId: UniqueEntityID
    content: string
    createdAt: Date
    updatedAt?: Date
}

export class AnswerComment extends Entity<TAnswerCommentProps> {
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

    static create(
        props: Optional<TAnswerCommentProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const answerComment = new AnswerComment(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id
        )
        return answerComment
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}
