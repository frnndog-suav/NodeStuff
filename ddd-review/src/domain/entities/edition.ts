import { randomUUID } from "node:crypto";

type TConstructorParams = {
  id?: string;
  title: string;
  creatorId: string;
  description: string;
};

export class Edition {
  public id: string;
  public title: string;
  public creatorId: string;
  public description: string;

  constructor({ id, title, description, creatorId }: TConstructorParams) {
    this.title = title;
    this.creatorId = creatorId;
    this.id = id ?? randomUUID();
    this.description = description;
  }
}
