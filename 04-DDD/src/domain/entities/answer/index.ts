import { Entity } from '../../../core/entities'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

type TAnswerProps = {
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
}
