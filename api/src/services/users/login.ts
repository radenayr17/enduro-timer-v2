import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { LoginDto } from "@/dtos/users";
import PrismaClient from "@/prisma/client";
import { hashPassword } from "@/utils/encrypt";

const loginUser = async (req: Request<unknown, unknown, LoginDto>, res: Response) => {
  const { username } = req.body;
  const password = await hashPassword(req.body.password);

  const user = await PrismaClient.user.findFirst({
    where: { username, password },
    select: { id: true },
  });

  if (!user) {
    return res.status(400).json({ message: ErrorMessage.INVALID_CREDENTIALS });
  }

  res.status(200).json({ ...user });
};

export default loginUser;
