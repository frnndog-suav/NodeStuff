import { Entity } from '@/core/entities'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '../value-objects/unique-entity-id'
import { AnswerAttachmentList } from '../watched-list/answer'

export type TAnswerProps = {
    content: string
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    createdAt: Date
    attachments: AnswerAttachmentList
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
    get attachments() {
        return this.props.attachments
    }

    set content(newContent: string) {
        this.props.content = newContent
        this.touch()
    }
    set attachments(newList: AnswerAttachmentList) {
        this.props.attachments = newList
        this.touch()
    }

    static create(
        props: Optional<TAnswerProps, 'createdAt' | 'attachments'>,
        id?: UniqueEntityID
    ) {
        const answer = new Answer(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
                attachments: props.attachments ?? new AnswerAttachmentList(),
            },
            id
        )
        return answer
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}
