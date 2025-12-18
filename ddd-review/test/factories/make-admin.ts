import { Admin, TAdminProps } from "@/domain/game/enterprise/entities/admin.js";
import { faker } from "@faker-js/faker";

export function makeAdmin(override: Partial<TAdminProps> = {}, id?: string) {
  const admin = Admin.create({
    email: faker.internet.email(),
    username: faker.internet.username(),
    ...override,
    id,
  });

  return admin;
}
