import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";
import { Prisma } from "@prisma/client";

const getStage = async (req: Request<IDDto>, res: Response) => {
  const { id } = req.params;

  const stage = await PrismaClient.raceStage.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      key: true,
      raceId: true,
      race: { select: { name: true, from: true, to: true } },
    },
  });

  if (!stage) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  res.status(200).json(stage);
};

export default getStage;
