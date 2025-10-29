import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/app-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TTokenPayload = {
  role: string;
  sub: string;
};

export function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TTokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
}
