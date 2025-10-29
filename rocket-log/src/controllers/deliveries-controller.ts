import { prisma } from "@/database/prisma";
import { NextFunction, Request, Response } from "express";
import z from "zod";

export class DeliveriesController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      user_id: z.uuid(),
      description: z.string(),
    });

    const { description, user_id } = bodySchema.parse(request.body);

    await prisma.deliver.create({
      data: {
        userId: user_id,
        description,
      },
    });

    return response.status(201).json();
  }

  async list(request: Request, response: Response, next: NextFunction) {
    const deliveries = await prisma.deliver.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return response.json(deliveries);
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"]),
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    await prisma.deliver.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    return response.json();
  }
}
