import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

if (!process.env.ISSUER_BASE_URL || !process.env.AUDIENCE) {
  throw "Make sure you have ISSUER_BASE_URL, and AUDIENCE in your .env file";
}

export const checkJWT = auth();
