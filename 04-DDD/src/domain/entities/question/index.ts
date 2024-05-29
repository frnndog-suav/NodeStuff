import { Entity } from '../../../core/entities'
import { Slug } from '../value-objects/slug'

type TQuestionProps = {
    title: string
    content: string
    authorId: string
    slug: Slug
}

export class Question extends Entity<TQuestionProps> {}
