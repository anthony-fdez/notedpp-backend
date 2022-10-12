import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";

if (!process.env.ISSUER_BASE_URL || !process.env.AUDIENCE) {
  throw "Make sure you have ISSUER_BASE_URL, and AUDIENCE in your .env file";
}

let checkJWT: any;

if (process.env.NODE_ENV === "test") {
  checkJWT = (req: Request, res: Response, next: NextFunction) => {
    next();
  };
} else checkJWT = auth();

export default checkJWT;
