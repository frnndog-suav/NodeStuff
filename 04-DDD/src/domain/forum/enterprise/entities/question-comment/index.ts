import { Entity } from '@/core/entities'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TQuestionCommentProps = {
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    content: string
    createdAt: Date
    updatedAt?: Date
}

export class QuestionComment extends Entity<TQuestionCommentProps> {
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
        props: Optional<TQuestionCommentProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const questionComment = new QuestionComment(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id
        )
        return questionComment
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}
