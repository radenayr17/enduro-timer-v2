import { Request, Response } from "express";

import { CreateRacerDto } from "@/dtos/races";
import PrismaClient from "@/prisma/client";
import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";

const createRacer = async (req: Request<IDDto, unknown, CreateRacerDto>, res: Response) => {
  const { id } = req.params;
  const { categoryId, firstName, lastName, number, stages } = req.body;

  const race = await PrismaClient.race.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!race) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const category = await PrismaClient.raceCategory.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });

  if (!category) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const racerNumber = await PrismaClient.racer.findFirst({
    where: { number, category: { raceId: id } },
    select: { id: true },
  });

  if (racerNumber) {
    return res.status(400).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const racer = await PrismaClient.racer.create({
    data: {
      categoryId,
      firstName,
      lastName,
      number,
      RacerTime: {
        create: stages.map((stage) => ({
          startTime: stage.startTime,
          stageId: stage.stageId,
        })),
      },
    },
  });

  res.status(200).json(racer);
};

export default createRacer;
