import { Admin, TAdminProps } from "@/domain/game/enterprise/entities/admin.js";

export function makeAdmin(override: Partial<TAdminProps> = {}) {
  const admin = Admin.create({
    email: "example@gmail.com",
    username: "example-admin",
    ...override
  });

  return admin;
}
