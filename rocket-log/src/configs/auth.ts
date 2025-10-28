export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: 24 * 60 * 60 * 1000,
  },
};
