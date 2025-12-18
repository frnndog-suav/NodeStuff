import { Entity } from "@/domain/core/entities/entity.js";

type TActionProps = {
  title: string;
  createdAt: Date;
  description: string;
  updatedAt?: Date | undefined;
  imageUrl?: string | undefined;
  editionId?: string | undefined;
};

export class Action extends Entity<TActionProps> {
  static create(props: Omit<TActionProps, "createdAt" | "updatedAt"> & { id?: string }) {
    return new Action({
      id: props.id,
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

  set description(description: string) {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.updatedAt = new Date();
  }

  set editionId(editionId: string | undefined) {
    this.props.editionId = editionId;
    this.props.updatedAt = new Date();
  }
}
