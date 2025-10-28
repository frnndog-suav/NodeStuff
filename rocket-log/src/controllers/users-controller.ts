import { NextFunction, Request, Response } from "express";
import z from "zod";

export class UsersController {
  create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.email(),
      password: z.string().min(6),
    });

    const parsedData = bodySchema.parse(req.body);

    return res.json({ message: "User created successfully", data: parsedData });
  }
}
