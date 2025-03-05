import { Request, Response } from "express";

import { SUCCESS_TXT } from "@/constants";
import { ErrorMessage, RaceErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";

const deleteRace = async (req: Request<IDDto>, res: Response) => {
  const { id: raceId } = req.params;

  const race = await PrismaClient.race.findUnique({
    where: { id: raceId },
    select: { id: true, RaceCategory: { select: { id: true } }, RaceStage: { select: { id: true } } },
  });

  if (!race) {
    return res.status(404).json({ message: ErrorMessage.RACE_NOT_FOUND });
  }

  if (race.RaceCategory.length && race.RaceStage.length) {
    return res.status(400).json({ message: RaceErrorMessage.RACE_CANNOT_BE_DELETED });
  }

  const response = await PrismaClient.race.delete({ where: { id: raceId } });

  console.log(response);

  res.status(200).json({ message: SUCCESS_TXT });
};

export default deleteRace;
