import { Request, Response } from "express";

import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";
import { Prisma } from "@prisma/client";

const getRacersByCategory = async (req: Request<IDDto>, res: Response) => {
  const { subId: categoryId } = req.params;

  const where: Prisma.RacerWhereInput = { categoryId };

  const [racers, count] = await Promise.all([
    PrismaClient.racer.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        number: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { number: Prisma.SortOrder.asc },
    }),
    PrismaClient.racer.count({ where }),
  ]);

  res.status(200).json({ data: racers, count });
};

export default getRacersByCategory;
