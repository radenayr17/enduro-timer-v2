import { Request, Response } from "express";

import { SUCCESS_TXT } from "@/constants";
import { ErrorMessage, RaceErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";

const deleteStage = async (req: Request<IDDto>, res: Response) => {
  const { subId: id } = req.params;

  const category = await PrismaClient.raceStage.findUnique({
    where: { id },
    select: { id: true, RacerTime: { select: { id: true } } },
  });

  if (!category) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const racerTime = category.RacerTime ?? [];

  if (racerTime.length) {
    return res.status(400).json({ message: RaceErrorMessage.STAGE_CANNOT_BE_DELETED });
  }

  const response = await PrismaClient.raceStage.delete({ where: { id: category.id } });

  console.log(response);

  res.status(200).json({ message: SUCCESS_TXT });
};

export default deleteStage;
