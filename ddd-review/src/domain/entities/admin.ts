import { User } from "./user";

export class Admin extends User {
  constructor() {
    super({ username: "", email: "", id: "" });
  }
}
