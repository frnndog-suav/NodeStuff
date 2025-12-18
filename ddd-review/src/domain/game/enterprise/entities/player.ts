import { Entity } from "@/domain/core/entities/entity.js";

type TPlayerProps = {
  email: string;
  createdAt: Date;
  updatedAt?: Date;
  username: string;
  imageUrl?: string | undefined;
};

export class Player extends Entity<TPlayerProps> {
  static create(
    props: Omit<TPlayerProps, "createdAt" | "updatedAt"> & { id?: string },
  ) {
    return new Player({
      id: props.id,
      props: {
        ...props,
        createdAt: new Date(),
      },
    });
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }
}
