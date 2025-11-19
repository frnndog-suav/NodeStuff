import { randomUUID } from "node:crypto";

type TConstructorParams<T> = {
  props: T;
  id: string | undefined;
};

export class User<T> {
  private _id: string;

  protected props: T;

  constructor({ props, id }: TConstructorParams<T>) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
}
