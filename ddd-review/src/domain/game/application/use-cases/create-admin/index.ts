import { Admin } from "@/domain/game/enterprise/entities/admin.js";
import { AdminsRepository } from "../../repositories/admin-repository.js";

type TParams = {
  email: string;
  username: string;
  imageUrl?: string | undefined;
};

export class CreateAdminUseCase {
  constructor(private repository: AdminsRepository) {}

  async execute({ email, username, imageUrl }: TParams) {
    const admin = Admin.create({ email, username, imageUrl });

    const createdAdmin = await this.repository.create(admin);

    return createdAdmin;
  }
}
