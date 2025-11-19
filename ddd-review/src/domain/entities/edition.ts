import { Entity } from "../core/entities/entity";

type TEditionProps = {
  title: string;
  creatorId: string;
  description: string;
};

export class Edition extends Entity<TEditionProps> {
  get title() {
    return this.props.title;
  }

  get creatorId() {
    return this.props.creatorId;
  }

  get description() {
    return this.props.description;
  }
}
