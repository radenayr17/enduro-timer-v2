import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const ID_TOKEN_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export type TUserTokenInput = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
};

export type TUserTokenOutput = {
  idToken: string;
  refreshToken: string;
  expiresAt: string;
};

export const hashPassword = (password: string): string => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

export const signUserToken = (data: TUserTokenInput): TUserTokenOutput => {
  const idToken = jwt.sign(data, process.env.JWT_SECRET ?? "", { expiresIn: ID_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET_REFRESH ?? "", { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  const expiresAt = dayjs().add(7, "days").toISOString();

  return { idToken, refreshToken, expiresAt };
};

export const verifyUserToken = (token: string, type: "TOKEN" | "REFRESH_TOKEN"): TUserTokenInput => {
  return jwt.verify(
    token,
    type === "TOKEN" ? process.env.JWT_SECRET ?? "" : process.env.JWT_SECRET_REFRESH ?? ""
  ) as TUserTokenInput;
};
