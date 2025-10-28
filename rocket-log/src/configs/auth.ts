import { ENV } from "@/utils/env";

export const authConfig = {
  jwt: {
    secret: ENV.JWT_SECRET,
    expiresIn: 24 * 60 * 60 * 1000,
  },
};
