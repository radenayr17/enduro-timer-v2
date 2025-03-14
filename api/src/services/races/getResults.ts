import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";

const getResults = async (req: Request<IDDto>, res: Response) => {
  const { subId: categoryId } = req.params;

  const category = await PrismaClient.raceCategory.findUnique({
    where: { id: categoryId },
    select: { id: true, racer: { select: { id: true } }, race: { select: { id: true, RaceStage: true } } },
  });

  if (!category) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const records = await PrismaClient.racer.findMany({
    where: { categoryId: category.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      number: true,
      category: true,
      RacerTime: {
        select: {
          id: true,
          startTime: true,
          finishTime: true,
          diffTime: true,
          stage: {
            select: {
              id: true,
              name: true,
              key: true,
            },
          },
          record: true,
        },
      },
    },
  });

  const results = records
    .map((racer) => {
      const isDNF = racer.RacerTime.some((time) => !time.finishTime || !time.record);
      const totalTime = racer.RacerTime.reduce((acc, time) => acc + (time.diffTime || 0), 0);

      return {
        ...racer,
        isDNF,
        totalTime,
      };
    })
    .sort((a, b) => {
      if (a.isDNF && !b.isDNF) return 1; // Place DNF racers at the bottom
      if (!a.isDNF && b.isDNF) return -1; // Place non-DNF racers at the top
      return a.totalTime - b.totalTime; // Sort by totalTime (lowest first)
    });

  res.status(200).json(results);
};

export default getResults;
