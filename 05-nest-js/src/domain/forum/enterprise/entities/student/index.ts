import { Entity } from '@/core/entities'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TStudentProps = {
  name: string
  email: string
  password: string
}

export class Student extends Entity<TStudentProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: TStudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}
