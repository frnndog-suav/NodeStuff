import { Router } from "express";

export const healthCheckRoutes = Router();

healthCheckRoutes.get("/", async (request, response) => {
  return response.status(200).json({ message: "Hello Docker" });
});
