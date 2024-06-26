import { Entity } from '@/core/entities'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TAttachmentProps = {
  title: string
  link: string
}

export class Attachment extends Entity<TAttachmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: TAttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
