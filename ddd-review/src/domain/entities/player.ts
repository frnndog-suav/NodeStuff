import { User } from "./user";

type TPlayerProps = {
  username: string;
  email: string;
};

export class Player extends User<TPlayerProps> {
  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }
}
