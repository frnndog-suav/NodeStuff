import { Entity } from "../core/entities/entity";

type TAdminProps = {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Admin extends Entity<TAdminProps> {
  static create(props: Omit<TAdminProps, "createdAt" | "updatedAt">) {
    return new Admin({
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
