import { UniqueEntityID } from '../../domain/entities/value-objects/unique-entity-id'

export class Entity<T> {
    private _id: UniqueEntityID
    protected props: T

    get id() {
        return this._id
    }

    constructor(props: T, id?: string) {
        this._id = new UniqueEntityID(id)
        this.props = props
    }
}
