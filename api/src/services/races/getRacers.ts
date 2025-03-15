import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { IDDto } from "@/dtos/common";
import GetRacersDto from "@/dtos/races/get-racers.dto";

const getRacers = async (req: Request<IDDto, unknown, unknown, GetRacersDto>, res: Response) => {
  const { id } = req.params;
  const { categoryId } = req.query;

  let where: Prisma.RacerWhereInput = {
    category: {
      raceId: id,
    },
  };

  if (categoryId) {
    where = { ...where, categoryId };
  }

  const [racers, count] = await Promise.all([
    PrismaClient.racer.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        number: true,
        address: true,
        teams: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        RacerTime: {
          select: {
            id: true,
            startTime: true,
            finishTime: true,
            diffTime: true,
            stage: {
              select: {
                name: true,
                key: true,
              },
            },
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
