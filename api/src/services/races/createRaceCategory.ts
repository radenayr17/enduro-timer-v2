import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import { CreateRaceStageDto } from "@/dtos/races";
import PrismaClient from "@/prisma/client";

const createRaceCategory = async (req: Request<IDDto, unknown, CreateRaceStageDto>, res: Response) => {
  const { name } = req.body;
  const { id: raceId } = req.params;

  const race = await PrismaClient.race.findUnique({
    where: { id: raceId },
    select: { id: true },
  });

  if (!race) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const key = name.replace(/ /g, "_").toUpperCase();
  const category = await PrismaClient.raceCategory.create({
    data: {
      key,
      name,
      raceId: race.id,
    },
  });

  res.status(200).json({ ...category });
};

export default createRaceCategory;
