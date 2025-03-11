import { Request, Response } from "express";

import { SUCCESS_TXT } from "@/constants";
import { ErrorMessage, RaceErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";

const deleteStage = async (req: Request<IDDto>, res: Response) => {
  const { subId: id } = req.params;

  const racer = await PrismaClient.racer.findUnique({
    where: { id },
    select: {
      id: true,
      RacerTime: {
        select: { id: true, startTime: true, finishTime: true },
      },
    },
  });

  if (!racer) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const racerTime = racer.RacerTime ?? [];
  const hasFinishTime = racerTime.some((item) => item.finishTime);

  console.log("hasFinishTime", hasFinishTime);

  if (hasFinishTime) {
    return res.status(400).json({ message: RaceErrorMessage.RACER_CANNOT_BE_DELETED });
  }

  await PrismaClient.racerTime.deleteMany({ where: { racerId: id } });

  const response = await PrismaClient.racer.delete({ where: { id: racer.id } });

  console.log(response);

  res.status(200).json({ message: SUCCESS_TXT });
};

export default deleteStage;
