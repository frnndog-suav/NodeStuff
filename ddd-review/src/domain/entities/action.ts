import { randomUUID } from "node:crypto";

export class Action {
  public id: string;
  public title: string;
  public description: string;

  constructor(title: string, description: string, id?: string) {
    this.title = title;
    this.id = id ?? randomUUID();
    this.description = description;
  }
}
