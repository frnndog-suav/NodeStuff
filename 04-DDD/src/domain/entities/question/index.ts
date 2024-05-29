import { UniqueEntityID } from './../value-objects/unique-entity-id/index'
import { Entity } from '../../../core/entities'
import { Slug } from '../value-objects/slug'

type TQuestionProps = {
    title: string
    content: string
    authorId: UniqueEntityID
    slug: Slug
    bestAnswerID?: UniqueEntityID
    createdAt: Date
    updatedAt?: Date
}

export class Question extends Entity<TQuestionProps> {}
