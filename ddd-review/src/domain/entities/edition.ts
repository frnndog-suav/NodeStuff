import { randomUUID } from "node:crypto";

type TConstructorParams = {
  id?: string;
  title: string;
  description: string;
  createdById: string;
};

export class Edition {
  public id: string;
  public title: string;
  public description: string;
  public createdById: string;

  constructor({ id, title, description, createdById }: TConstructorParams) {
    this.title = title;
    this.id = id ?? randomUUID();
    this.description = description;
    this.createdById = createdById;
  }
}
