import { randomUUID } from "node:crypto";

type TConstructorParams = {
  id?: string;
  email: string;
  username: string;
};

export class User {
  public id: string;
  public username: string;
  public email: string;

  constructor({ username, email, id }: TConstructorParams) {
    this.email = email;
    this.username = username;
    this.id = id ?? randomUUID();
  }
}
