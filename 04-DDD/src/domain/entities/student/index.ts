import { Entity } from '../../../core/entities'
import { Optional } from '../../../core/types/optional'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

export type TStudentProps = {
    name: string
}

export class Student extends Entity<TStudentProps> {
    static create(props: TStudentProps, id?: UniqueEntityID) {
        const student = new Student(props, id)

        return student
    }
}
