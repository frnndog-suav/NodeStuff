import { Entity } from '../../../core/entities'

type TAnswerProps = {
    content: string
    authorId: string
    questionId: string
}

export class Answer extends Entity<TAnswerProps> {
    get content() {
        return this.props.content
    }
}
