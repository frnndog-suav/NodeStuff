import { randomUUID } from "node:crypto";

type TConstructorParams = {
  id?: string;
  email: string;
  username: string;
};

export class User {
  private _id: string;
  private _email: string;
  private _username: string;

  constructor({ username, email, id }: TConstructorParams) {
    this._email = email;
    this._username = username;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }
}
