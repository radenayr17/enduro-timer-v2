import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";

const getUsers = async (req: Request, res: Response) => {
  const [users, count] = await Promise.all([
    PrismaClient.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    }),
    PrismaClient.user.count(),
  ]);

  res.status(200).json({ data: users, count });
};

export default getUsers;
