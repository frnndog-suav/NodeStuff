import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id'

export class Entity<T> {
    private _id: UniqueEntityID
    protected props: T

    get id() {
        return this._id
    }

    protected constructor(props: T, id?: UniqueEntityID) {
        this._id = id ?? new UniqueEntityID()
        this.props = props
    }
}