import { Entity } from "@/domain/core/entities/entity.js";

export type TAdminProps = {
  email: string;
  createdAt: Date;
  updatedAt?: Date;
  username: string;
  imageUrl?: string | undefined;
};

export class Admin extends Entity<TAdminProps> {
  static create(props: Omit<TAdminProps, "createdAt" | "updatedAt"> & { id?: string | undefined }) {
    return new Admin({
      id: props.id,
      props: {
        ...props,
        createdAt: new Date(),
        imageUrl: props.imageUrl,
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
