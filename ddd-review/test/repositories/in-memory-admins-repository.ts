import { AdminsRepository } from "@/domain/game/application/repositories/admin-repository.js";
import { Admin } from "@/domain/game/enterprise/entities/admin.js";

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = [];

  async add(admin: Admin): Promise<void> {
    this.items.push(admin);
  }

  async create(admin: Admin): Promise<Admin> {
    this.items.push(admin);
    return admin;
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.id === id);

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  }
}
