import { Entity } from '@/core/entities'
import { UniqueEntityID } from '../../value-objects/unique-entity-id'

type TAnswerAttachmentProps = {
    answerId: string
    attachmentId: string
}

export class AnswerAttachment extends Entity<TAnswerAttachmentProps> {
    get answerId() {
        return this.props.answerId
    }
    get attachmentId() {
        return this.props.attachmentId
    }

    static create(props: TAnswerAttachmentProps, id?: UniqueEntityID) {
        const attachment = new AnswerAttachment(props, id)

        return attachment
    }
}
