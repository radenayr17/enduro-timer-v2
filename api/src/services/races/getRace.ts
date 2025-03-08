import { Request, Response } from "express";

import { ErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";
import { Prisma } from "@prisma/client";

const SELECT_FIELDS = {
  select: {
    id: true,
    name: true,
    key: true,
  },
  orderBy: { createdAt: Prisma.SortOrder.asc },
};

const getRace = async (req: Request<IDDto>, res: Response) => {
  const { id } = req.params;

  const race = await PrismaClient.race.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      from: true,
      to: true,
      RaceStage: { ...SELECT_FIELDS },
      RaceCategory: { ...SELECT_FIELDS },
    },
  });

  if (!race) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  res.status(200).json(race);
};

export default getRace;
