import { User } from "./user";

type TAdminProps = {
  username: string;
  email: string;
};

export class Admin extends User<TAdminProps> {
  constructor(props: TAdminProps, id?: string) {
    super({ props, id });
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }
}
