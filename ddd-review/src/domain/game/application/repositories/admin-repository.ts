import { Admin } from "../../enterprise/entities/admin.js";

export interface AdminsRepository {
  create(admin: Admin): Promise<Admin>;

  findById(id: string): Promise<Admin | null>;
}
