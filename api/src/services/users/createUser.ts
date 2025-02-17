import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import CreateUserDto from "@/dtos/users/create-user.dto";
import PrismaClient from "@/prisma/client";
import { hashPassword } from "@/utils/encrypt";

const createUser = async (req: Request<unknown, unknown, CreateUserDto>, res: Response) => {
  const { username, password, firstName, lastName } = req.body;

  const userByUsername = await PrismaClient.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (userByUsername) {
    return res.status(400).json({ message: ErrorMessage.USERNAME_ALREADY_EXISTS });
  }

  const hashedPassword = await hashPassword(password);
  const user = await PrismaClient.user.create({
    data: {
      username,
      password: hashedPassword,
      firstName,
      lastName,
    },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
    },
  });

  res.status(200).json({ ...user });
};

export default createUser;
