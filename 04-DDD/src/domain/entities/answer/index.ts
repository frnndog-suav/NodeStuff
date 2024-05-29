import { Entity } from '../../../core/entities'
import { Optional } from '../../../core/types/optional'
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
}
