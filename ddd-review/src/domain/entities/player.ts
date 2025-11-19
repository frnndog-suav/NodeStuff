import { User } from "./user";

type TPlayerProps = {
  username: string;
  email: string;
};

export class Player extends User<TPlayerProps> {
  constructor(props: TPlayerProps, id?: string) {
    super({ props, id });
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }
}
