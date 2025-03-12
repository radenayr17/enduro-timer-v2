import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";

import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";
import { CreateStageRecordDto } from "@/dtos/stages";

const createStageRecord = async (req: Request<IDDto, unknown, CreateStageRecordDto>, res: Response) => {
  const { id } = req.params;
  const { time } = req.body;

  const stage = await PrismaClient.raceStage.findUnique({ where: { id }, select: { id: true, raceId: true } });

  if (!stage) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const record = await PrismaClient.raceRecord.create({
    data: {
      time,
      stageId: stage.id,
      raceId: stage.raceId,
    },
  });

  res.status(200).json(record);
};

export default createStageRecord;
