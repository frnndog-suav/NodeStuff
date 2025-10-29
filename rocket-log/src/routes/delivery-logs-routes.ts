import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { ensureAuthentication } from "@/middlewares/ensure-authentication";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

export const deliveryLogsRoutes = Router();

const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
  "/",
  ensureAuthentication,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
);
