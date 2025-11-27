import { Entity } from "@/domain/core/entities/entity";

type TPlayerProps = {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Player extends Entity<TPlayerProps> {
  static create(props: Omit<TPlayerProps, "createdAt" | "updatedAt">) {
    return new Player({
      id: undefined,
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
