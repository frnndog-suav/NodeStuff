import { randomUUID } from "node:crypto";

type TConstructorParams<T> = {
  props: T;
  id: string | undefined;
};

export class Entity<T> {
  private _id: string;

  protected props: T;

  protected constructor({ props, id }: TConstructorParams<T>) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
}
