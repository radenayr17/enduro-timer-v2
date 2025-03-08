import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { IDDto } from "@/dtos/common";

const getRacers = async (req: Request<IDDto>, res: Response) => {
  const { id } = req.params;

  const where: Prisma.RacerWhereInput = {
    category: {
      raceId: id,
    },
  };

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

export default getRacers;
