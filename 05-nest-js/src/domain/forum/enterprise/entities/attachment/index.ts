import { Entity } from '@/core/entities'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TAttachmentProps = {
  title: string
  url: string
}

export class Attachment extends Entity<TAttachmentProps> {
  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }

  static create(props: TAttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
