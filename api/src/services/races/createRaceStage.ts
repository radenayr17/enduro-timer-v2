import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import { CreateRaceStageDto } from "@/dtos/races";
import PrismaClient from "@/prisma/client";

const createRaceStage = async (req: Request<IDDto, unknown, CreateRaceStageDto>, res: Response) => {
  const { name, key } = req.body;
  const { id: raceId } = req.params;

  const race = await PrismaClient.race.findUnique({
    where: { id: raceId },
    select: { id: true },
  });

  if (!race) {
    return res.status(404).json({ message: ErrorMessage.RACE_NOT_FOUND });
  }

  const raceStage = await PrismaClient.raceStage.create({
    data: {
      key,
      name,
      raceId: race.id,
    },
  });

  res.status(200).json({ ...raceStage });
};

export default createRaceStage;
