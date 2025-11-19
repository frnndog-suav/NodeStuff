import { Entity } from "../core/entities/entity";

type TAdminProps = {
  username: string;
  email: string;
};

export class Admin extends Entity<TAdminProps> {
  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }
}
