import { Request, Response } from "express";

import { CreateRaceDto } from "@/dtos/races";
import PrismaClient from "@/prisma/client";
import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";

const updateRace = async (req: Request<IDDto, unknown, CreateRaceDto>, res: Response) => {
  const { name, description, from, to } = req.body;
  const { id } = req.params;

  const race = await PrismaClient.race.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!race) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const updated = await PrismaClient.race.update({
    where: { id: race.id },
    data: {
      name,
      description,
      from,
      to,
    },
  });

  res.status(200).json({ ...updated });
};

export default updateRace;
