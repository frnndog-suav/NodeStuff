import { randomUUID } from "node:crypto";

type TConstructorParams = {
  id?: string;
  title: string;
  editionId?: string;
  description: string;
};

export class Action {
  public id: string;
  public title: string;
  public description: string;
  public editionId: string | undefined;

  constructor({ id, title, description, editionId }: TConstructorParams) {
    this.title = title;
    this.id = id ?? randomUUID();
    this.editionId = editionId;
    this.description = description;
  }
}
