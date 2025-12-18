import { Entity } from "@/domain/core/entities/entity.js";

export type TEditionProps = {
  title: string;
  createdAt: Date;
  updatedAt?: Date;
  creatorId: string;
  description: string;
  imageUrl?: string | undefined;
};

export class Edition extends Entity<TEditionProps> {
  static create(
    props: Omit<TEditionProps, "createdAt" | "updatedAt"> & { id?: string | undefined },
  ) {
    return new Edition({
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

  get creatorId() {
    return this.props.creatorId;
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

  set creatorId(creatorId: string) {
    this.props.creatorId = creatorId;
    this.props.updatedAt = new Date();
  }
}
