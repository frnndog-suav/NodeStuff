import {
    Question,
    TQuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

export function makeQuestion(override: Partial<TQuestionProps> = {}) {
    return Question.create({
        title: 'Example question',
        slug: Slug.create('example-question'),
        authorId: new UniqueEntityID(),
        content: 'example content',
        ...override,
    })
}
