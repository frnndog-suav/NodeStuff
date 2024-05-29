import { Entity } from '../../../core/entities'

export type TStudentProps = {
    name: string
}

export class Student extends Entity<TStudentProps> {}
