import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";

export function verifyUserAuthorization(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!roles.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
}
