import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";

const getStages = async (req: Request, res: Response) => {
  const [stages, count] = await Promise.all([
    PrismaClient.raceStage.findMany({
      select: {
        id: true,
        name: true,
        key: true,
        raceId: true,
        race: { select: { name: true, from: true, to: true } },
        _count: { select: { RaceRecord: { where: { racerId: { not: null } } } } },
      },
      orderBy: [{ race: { from: "asc" } }, { key: "asc" }],
    }),
    PrismaClient.raceStage.count(),
  ]);

  res.status(200).json({ data: stages, count });
};

export default getStages;
