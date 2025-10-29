import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import z from "zod";

const BCRYPT_SALT = 8;

export class UsersController {
  async create(req: Request, res: Response, _next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.email(),
      password: z.string().min(6),
      role: z.enum(["customer", "sale"]).default("customer"),
    });

    const { email, name, password, role } = bodySchema.parse(req.body);

    const hashedPassword = await hash(password, BCRYPT_SALT);

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError("User with this email already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      name: user.name,
      email: user.email,
    });
  }
}
