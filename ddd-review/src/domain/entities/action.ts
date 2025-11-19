import { Entity } from "../core/entities/entity";

type TAction = {
  title: string;
  editionId?: string;
  description: string;
};

export class Action extends Entity<TAction> {
  get title() {
    return this.props.title;
  }

  get editionId() {
    return this.props.editionId;
  }

  get description() {
    return this.props.description;
  }
}
