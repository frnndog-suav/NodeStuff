import { randomUUID } from "node:crypto";

export class User {
  public id: string;
  public username: string;
  public email: string;

  constructor(username: string, email: string, id?: string) {
    this.email = email;
    this.username = username;
    this.id = id ?? randomUUID();
  }
}
