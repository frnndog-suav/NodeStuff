import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthentication } from "@/middlewares/ensure-authentication";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

export const deliveriesRoutes = Router();

const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthentication, verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.list);
