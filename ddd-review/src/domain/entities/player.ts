import { Entity } from "../core/entities/entity";

type TPlayerProps = {
  username: string;
  email: string;
};

export class Player extends Entity<TPlayerProps> {
  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }
}
