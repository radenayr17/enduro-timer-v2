import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";

import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";

const getStageRecords = async (req: Request<IDDto>, res: Response) => {
  const { id } = req.params;

  const stage = await PrismaClient.raceStage.findUnique({ where: { id } });

  if (!stage) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const records = await PrismaClient.raceRecord.findMany({
    where: { stageId: id },
    select: {
      id: true,
      time: true,
      stageId: true,
      racerId: true,
      racer: { select: { id: true, number: true, firstName: true, lastName: true } },
      race: { select: { name: true } },
      stage: { select: { name: true } },
    },
    orderBy: { time: "desc" },
  });

  res.status(200).json(records);
};

export default getStageRecords;
