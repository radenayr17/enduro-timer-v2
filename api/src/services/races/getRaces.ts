import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";
import { Prisma } from "@prisma/client";

const SELECT_FIELDS = {
  select: {
    id: true,
    name: true,
    key: true,
    raceId: true,
  },
  orderBy: { createdAt: Prisma.SortOrder.asc },
};

const getRaces = async (req: Request, res: Response) => {
  const [races, count] = await Promise.all([
    PrismaClient.race.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        from: true,
        to: true,
        RaceStage: { ...SELECT_FIELDS },
        RaceCategory: { ...SELECT_FIELDS },
      },
    }),
    PrismaClient.race.count(),
  ]);

  res.status(200).json({ data: races, count });
};

export default getRaces;
