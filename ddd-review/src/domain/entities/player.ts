import { User } from "./user";

export class Player extends User {
  constructor() {
    super({ username: "", email: "", id: "" });
  }
}
