import { Entity } from "@/domain/core/entities/entity.js";

type TAdminProps = {
  email: string;
  createdAt: Date;
  updatedAt?: Date;
  username: string;
  imageUrl?: string | undefined;
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

  set email(newEmail: string) {
    this.props.email = newEmail;
    this.props.updatedAt = new Date();
  }

  set username(newUsername: string) {
    this.props.username = newUsername;
    this.props.updatedAt = new Date();
  }
}
