import { Request, Response } from "express";

import { SUCCESS_TXT } from "@/constants";
import { ErrorMessage, RaceErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";

const deleteRaceRecord = async (req: Request<IDDto>, res: Response) => {
  const { subId: id } = req.params;

  const record = await PrismaClient.raceRecord.findUnique({
    where: { id },
    select: { id: true, racerId: true },
  });

  if (!record) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  if (record.racerId) {
    return res.status(400).json({ message: RaceErrorMessage.RECORD_CANNOT_BE_DELETED });
  }

  const response = await PrismaClient.raceRecord.delete({ where: { id: record.id } });

  console.log(response);

  res.status(200).json({ message: SUCCESS_TXT });
};

export default deleteRaceRecord;
