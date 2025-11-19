import { User } from "./user";

type TAdminProps = {
  username: string;
  email: string;
};

export class Admin extends User<TAdminProps> {
  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }
}
