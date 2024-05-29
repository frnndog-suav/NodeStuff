import { UniqueEntityID } from './../value-objects/unique-entity-id/index'
import { Entity } from '../../../core/entities'
import { Slug } from '../value-objects/slug'
import { Optional } from '../../../core/types/optional'

type TQuestionProps = {
    title: string
    content: string
    authorId: UniqueEntityID
    slug: Slug
    bestAnswerID?: UniqueEntityID
    createdAt: Date
    updatedAt?: Date
}

export class Question extends Entity<TQuestionProps> {
    static create(
        props: Optional<TQuestionProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const question = new Question(
            {
                ...props,
                createdAt: new Date(),
            },
            id
        )

        return question
    }
}
