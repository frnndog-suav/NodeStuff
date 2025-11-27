import { AdminsRepository } from "@/domain/game/application/repositories/admin-repository.js";
import { Admin } from "@/domain/game/enterprise/entities/admin.js";

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = [];

  async create(admin: Admin): Promise<Admin> {
    this.items.push(admin);
    return admin;
  }
}
