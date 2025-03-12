import { Request, Response } from "express";

import { CreateRaceRecordDto } from "@/dtos/races";
import PrismaClient from "@/prisma/client";
import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";

const createRacer = async (req: Request<IDDto, unknown, CreateRaceRecordDto>, res: Response) => {
  const { id } = req.params;
  const { time, stageId } = req.body;

  const [race, stage] = await Promise.all([
    PrismaClient.race.findUnique({ where: { id }, select: { id: true } }),
    PrismaClient.raceStage.findUnique({ where: { id: stageId }, select: { id: true } }),
  ]);

  if (!race || !stage) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const record = await PrismaClient.raceRecord.create({
    data: {
      raceId: race.id,
      stageId: stage.id,
      time,
    },
  });

  res.status(200).json(record);
};

export default createRacer;
