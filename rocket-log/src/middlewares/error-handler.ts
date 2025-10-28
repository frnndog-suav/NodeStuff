import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: error.message, issues: z.treeifyError(error) });
  }

  return res.status(500).json({ message: error.message });
}
