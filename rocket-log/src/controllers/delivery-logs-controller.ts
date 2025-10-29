import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";
import z from "zod";

export class DeliveryLogsController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      delivery_id: z.uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.deliver.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!delivery) {
      throw new AppError("Delivery not found.", 404);
    }

    if (delivery.status === "processing") {
      throw new AppError(
        "Current delivery is 'processing'. Change status to 'shipped'."
      );
    }

    await prisma.deliveryLog.create({
      data: {
        deliverId: delivery.id,
        description,
      },
    });

    return response.status(201).json();
  }
}
