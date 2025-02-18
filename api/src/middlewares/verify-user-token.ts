import { NextFunction, Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { verifyUserToken as verifyToken } from "@/utils/encrypt";

const verifyUserToken = () => async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] ?? "";

  if (!token) {
    return res.status(401).json({ message: ErrorMessage.UNAUTHORIZED });
  }

  try {
    const verify = verifyToken(token, "TOKEN");

    req.headers.userId = verify.id;

    next();
  } catch (err) {
    const error = err as Error;
    const message = error.message;
    const status = message === "invalid token" ? 401 : 500;

    console.log(message);

    return res
      .status(status)
      .json({ message: status === 401 ? ErrorMessage.UNAUTHORIZED : ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export default verifyUserToken;
