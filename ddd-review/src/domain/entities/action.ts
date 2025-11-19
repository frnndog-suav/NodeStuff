import { Entity } from "../core/entities/entity";

type TActionProps = {
  title: string;
  editionId?: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Action extends Entity<TActionProps> {
  static create(props: Omit<TActionProps, "createdAt" | "updatedAt">) {
    return new Action({
      id: undefined,
      props: {
        ...props,
        createdAt: new Date(),
      },
    });
  }

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
