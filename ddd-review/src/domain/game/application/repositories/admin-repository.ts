import { Admin } from "../../enterprise/entities/admin";

export interface AdminsRepository {
  create(admin: Admin): Promise<void>;
}
