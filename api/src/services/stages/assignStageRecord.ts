import { Request, Response } from "express";

import PrismaClient from "@/prisma/client";

import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";
import { AssignStageRecordDto } from "@/dtos/stages";

const assignStageRecord = async (req: Request<IDDto, unknown, AssignStageRecordDto>, res: Response) => {
  const { subId: id } = req.params;
  const { racerId } = req.body;

  const record = await PrismaClient.raceRecord.findUnique({ where: { id }, select: { id: true } });

  if (!record) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const response = await PrismaClient.raceRecord.update({
    where: { id },
    data: {
      racerId,
    },
  });

  res.status(200).json(response);
};

export default assignStageRecord;
