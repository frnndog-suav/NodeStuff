import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import z from "zod";

export class SessionsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userWithSameEmail) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatched = await compare(password, userWithSameEmail.password);

    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    
  }
}
