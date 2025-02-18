import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { LoginDto } from "@/dtos/users";
import PrismaClient from "@/prisma/client";
import { hashPassword, signUserToken } from "@/utils/encrypt";

const loginUser = async (req: Request<unknown, unknown, LoginDto>, res: Response) => {
  const { username } = req.body;
  const password = await hashPassword(req.body.password);

  const user = await PrismaClient.user.findFirst({
    where: { username, password },
    select: { id: true, username: true, firstName: true, lastName: true },
  });

  if (!user) {
    return res.status(400).json({ message: ErrorMessage.INVALID_CREDENTIALS });
  }

  const { expiresAt, ...tokens } = signUserToken(user);

  await PrismaClient.userSession.create({
    data: {
      expiresAt,
      userId: user.id,
      idToken: tokens.idToken,
      refreshToken: tokens.refreshToken,
    },
  });

  res.status(200).json({ ...tokens });
};

export default loginUser;
