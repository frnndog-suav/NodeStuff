import { Entity } from '@/core/entities'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TInstructorProps = {
  name: string
}

export class Instructor extends Entity<TInstructorProps> {
  static create(props: TInstructorProps, id?: UniqueEntityID) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
